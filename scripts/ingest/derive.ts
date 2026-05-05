/**
 * Build the typed SchemaDataset from the filtered graph.
 *
 * After filter.ts has selected the in-scope nodes, this module computes the
 * derived fields that the UI consumes directly:
 *   - ancestors (transitive closure of parents, root → self)
 *   - children (inverse of parents)
 *   - directProperties / inheritedProperties for each Type and Enumeration
 *   - enumerationMembers for each Enumeration
 *   - categoryIds for each Type (from the editorial category map)
 *
 * Properties not in scope (e.g. `name`, `url` from Thing) are *referenced* in
 * inheritedProperties but not counted in `byKind.Property` — the UI links them
 * out to schema.org rather than rendering an in-app detail page.
 */

import {
  CATEGORY_INDEX_BY_TERM_ID,
  CATEGORIZED_TERM_IDS,
} from '../../src/data/categories.ts';
import type {
  SchemaDataset,
  SchemaEnumerationMember,
  SchemaProperty,
  SchemaTerm,
  SchemaType,
  TermKind,
} from '../../src/types/schema-org.ts';
import type { FilterResult } from './filter.ts';
import {
  commentContainsHtml,
  expandIri,
  stripHtml,
  toIdArray,
  toShortId,
} from './normalize.ts';

interface DeriveOptions {
  filterResult: FilterResult;
  schemaOrgVersion: string;
  sourceUrl: string;
  sourceHash: string;
  generatedAt: string;
}

export interface DeriveOutcome {
  dataset: SchemaDataset;
  /** termIds that the brief expects to be categorized but aren't. */
  uncategorizedTypes: string[];
  /** termIds whose `inheritedProperties` reference Property IDs not in scope. */
  externalPropertyRefs: string[];
}

export function buildDataset(opts: DeriveOptions): DeriveOutcome {
  const { filterResult, schemaOrgVersion, sourceUrl, sourceHash, generatedAt } = opts;
  const { rawById, scoped, enumerationClassIds } = filterResult;

  const termsById: Record<string, SchemaTerm> = {};
  const byKind: Record<TermKind, string[]> = {
    Type: [],
    Property: [],
    Enumeration: [],
    EnumerationMember: [],
  };

  // ── Stage 1: build the per-term record (without derived link fields) ───
  for (const [id, { node, classification }] of scoped) {
    const baseFields = {
      id,
      iri: expandIri(id),
      name: stringField(node['rdfs:label']) ?? id,
      description: stringField(node['rdfs:comment']) ? stripHtml(stringField(node['rdfs:comment'])!) : '',
      descriptionHtml:
        stringField(node['rdfs:comment']) && commentContainsHtml(stringField(node['rdfs:comment'])!)
          ? stringField(node['rdfs:comment'])!
          : undefined,
      layer: classification.layer,
      source: classification.source,
      pending: node['schema:isPartOf']?.['@id'] === 'https://pending.schema.org',
      supersededBy: toShortId(node['schema:supersededBy']) ?? undefined,
    };

    if (classification.kind === 'Type' || classification.kind === 'Enumeration') {
      const parents = toIdArray(node['rdfs:subClassOf']);
      const term: SchemaType = {
        ...baseFields,
        kind: classification.kind,
        parents,
        ancestors: [], // filled in stage 2
        children: [], // filled in stage 2
        directProperties: [], // filled in stage 3
        inheritedProperties: [], // filled in stage 3
        categoryIds: [], // filled in stage 4
      };
      termsById[id] = term;
    } else if (classification.kind === 'Property') {
      const term: SchemaProperty = {
        ...baseFields,
        kind: 'Property',
        domainIncludes: toIdArray(node['schema:domainIncludes']),
        rangeIncludes: toIdArray(node['schema:rangeIncludes']),
        subPropertyOf: toShortId(node['rdfs:subPropertyOf']) ?? undefined,
      };
      termsById[id] = term;
    } else {
      // EnumerationMember: its @type is the enumeration class id.
      const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
      const enumerationId =
        types.find((t) => enumerationClassIds.has(toShortId(t) ?? t)) ?? types[0] ?? '';
      const term: SchemaEnumerationMember = {
        ...baseFields,
        kind: 'EnumerationMember',
        enumerationId: toShortId(enumerationId) ?? enumerationId,
      };
      termsById[id] = term;
    }
  }

  // ── Stage 2: ancestors (transitive closure) and children (inverse) ─────
  for (const term of Object.values(termsById)) {
    if (term.kind !== 'Type' && term.kind !== 'Enumeration') continue;
    const ancestors = transitiveAncestors(term.id, termsById);
    term.ancestors = ancestors;
  }
  for (const term of Object.values(termsById)) {
    if (term.kind !== 'Type' && term.kind !== 'Enumeration') continue;
    for (const parentId of term.parents) {
      const parent = termsById[parentId];
      if (parent && (parent.kind === 'Type' || parent.kind === 'Enumeration')) {
        parent.children.push(term.id);
      }
    }
  }
  for (const term of Object.values(termsById)) {
    if (term.kind === 'Type' || term.kind === 'Enumeration') {
      term.children.sort();
    }
  }

  // ── Stage 3: directProperties + inheritedProperties ────────────────────
  // We need to look at properties in the FULL raw graph (not just scoped),
  // because inherited properties for Drug include core-Thing properties like
  // `name`, `url` which aren't in our 163-property set.
  const allPropertiesByDomain = new Map<string, string[]>();
  for (const [propId, rawNode] of rawById) {
    const types = Array.isArray(rawNode['@type']) ? rawNode['@type'] : [rawNode['@type']];
    if (!types.includes('rdf:Property')) continue;
    const domains = toIdArray(rawNode['schema:domainIncludes']);
    for (const domainId of domains) {
      const list = allPropertiesByDomain.get(domainId) ?? [];
      list.push(propId);
      allPropertiesByDomain.set(domainId, list);
    }
  }

  const externalPropertyRefs = new Set<string>();
  for (const term of Object.values(termsById)) {
    if (term.kind !== 'Type' && term.kind !== 'Enumeration') continue;
    const direct = allPropertiesByDomain.get(term.id) ?? [];
    term.directProperties = direct.slice().sort();

    const inherited = new Set<string>();
    for (const ancestorId of term.ancestors) {
      if (ancestorId === term.id) continue;
      const ancestorProps = allPropertiesByDomain.get(ancestorId) ?? [];
      for (const propId of ancestorProps) inherited.add(propId);
    }
    term.inheritedProperties = [...inherited].sort();

    // Track refs to properties that aren't first-class in our dataset
    // (i.e., not a member of byKind.Property after Stage 5).
    for (const propId of [...term.directProperties, ...term.inheritedProperties]) {
      if (!termsById[propId]) externalPropertyRefs.add(propId);
    }
  }

  // ── Stage 4: enumerationMembers + categoryIds ─────────────────────────
  for (const term of Object.values(termsById)) {
    if (term.kind === 'Enumeration') {
      term.enumerationMembers = Object.values(termsById)
        .filter((t): t is SchemaEnumerationMember => t.kind === 'EnumerationMember' && t.enumerationId === term.id)
        .map((t) => t.id)
        .sort();
    }
    if (term.kind === 'Type' || term.kind === 'Enumeration') {
      term.categoryIds = (CATEGORY_INDEX_BY_TERM_ID.get(term.id) ?? []).slice();
    }
  }

  // ── Stage 5: byKind index (excludes meta-layer Types) ─────────────────
  for (const term of Object.values(termsById)) {
    if (term.layer === 'meta') continue;
    byKind[term.kind].push(term.id);
  }
  for (const k of Object.keys(byKind) as TermKind[]) {
    byKind[k].sort();
  }

  // ── Stage 6: categoryAssignments map (categoryId → termIds present) ────
  const categoryAssignments: Record<string, string[]> = {};
  for (const [termId, categoryIds] of CATEGORY_INDEX_BY_TERM_ID) {
    if (!termsById[termId]) continue;
    for (const categoryId of categoryIds) {
      const list = categoryAssignments[categoryId] ?? [];
      list.push(termId);
      categoryAssignments[categoryId] = list;
    }
  }
  for (const k of Object.keys(categoryAssignments)) {
    categoryAssignments[k].sort();
  }

  // ── Stage 7: diagnostic: Types (not Enumerations) without category ─────
  // Enumerations don't need editorial categorization — they live in their own
  // Browse section per brief Section 4.2. Only Type-kind in-scope terms
  // without a category are flagged here.
  const uncategorizedTypes: string[] = [];
  for (const term of Object.values(termsById)) {
    if (term.kind !== 'Type') continue;
    if (term.layer === 'meta') continue;
    if (term.categoryIds.length === 0 && !CATEGORIZED_TERM_IDS.has(term.id)) {
      uncategorizedTypes.push(term.id);
    }
  }
  uncategorizedTypes.sort();

  return {
    dataset: {
      version: schemaOrgVersion,
      generatedAt,
      sourceUrl,
      sourceHash,
      termsById,
      byKind,
      categoryAssignments,
    },
    uncategorizedTypes,
    externalPropertyRefs: [...externalPropertyRefs].sort(),
  };
}

function stringField(value: unknown): string | null {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && '@value' in value) {
    const inner = (value as { '@value': unknown })['@value'];
    if (typeof inner === 'string') return inner;
  }
  return null;
}

function transitiveAncestors(
  startId: string,
  termsById: Record<string, SchemaTerm>,
): string[] {
  const visited = new Set<string>();
  const out: string[] = [];
  const stack: string[] = [startId];
  while (stack.length > 0) {
    const id = stack.pop()!;
    if (visited.has(id)) continue;
    visited.add(id);
    const term = termsById[id];
    if (!term || (term.kind !== 'Type' && term.kind !== 'Enumeration')) continue;
    for (const parentId of term.parents) {
      if (!visited.has(parentId)) stack.push(parentId);
    }
    if (id !== startId) out.push(id);
  }
  // Order: distant ancestors first (root → self order, where self isn't in the list).
  // Use a topological sort by ancestor-of relation.
  return topoSortAncestors(out, termsById);
}

function topoSortAncestors(
  ids: string[],
  termsById: Record<string, SchemaTerm>,
): string[] {
  const idSet = new Set(ids);
  const sorted: string[] = [];
  const visited = new Set<string>();
  function visit(id: string): void {
    if (visited.has(id)) return;
    visited.add(id);
    const term = termsById[id];
    if (!term || (term.kind !== 'Type' && term.kind !== 'Enumeration')) return;
    for (const parentId of term.parents) {
      if (idSet.has(parentId)) visit(parentId);
    }
    sorted.push(id);
  }
  for (const id of ids) visit(id);
  return sorted;
}
