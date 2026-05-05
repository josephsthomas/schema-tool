/**
 * Walk the raw schema.org JSON-LD graph and select the terms in scope.
 *
 * Inputs: the parsed dump's @graph (3000+ nodes covering all of schema.org).
 * Outputs: a classified view of the subset we keep:
 *   - 80 health-lifesci Types
 *   - 17 health-lifesci Enumerations
 *   - 163 health-lifesci Properties
 *   - 125 health-lifesci Enumeration Members
 *   - 19 core Types (Hospital, FAQPage, etc. — `CORE_TYPE_IDS`)
 *   - meta ancestors of the above, included so detail-page breadcrumbs link to
 *     real entries instead of dangling references
 */

import { CORE_TYPE_SET } from '../../src/data/core-types.ts';
import { toIdArray, toShortId } from './normalize.ts';

export interface RawNode {
  '@id': string;
  '@type': string | string[];
  'rdfs:label'?: string;
  'rdfs:comment'?: string;
  'rdfs:subClassOf'?: unknown;
  'rdfs:subPropertyOf'?: unknown;
  'schema:domainIncludes'?: unknown;
  'schema:rangeIncludes'?: unknown;
  'schema:isPartOf'?: { '@id': string };
  'schema:supersededBy'?: { '@id': string };
  [key: string]: unknown;
}

export type ResolvedKind = 'Type' | 'Enumeration' | 'Property' | 'EnumerationMember';

export interface Classification {
  kind: ResolvedKind;
  /** True when the node is in scope (health-lifesci or core or meta-ancestor). */
  inScope: boolean;
  /** Why we kept it. */
  source: 'health-lifesci' | 'core-allowlist' | 'meta-ancestor';
  layer: 'health-lifesci' | 'core' | 'meta';
}

export interface FilterResult {
  /** Indexed by short id. The full graph as parsed from the dump. */
  rawById: ReadonlyMap<string, RawNode>;
  /** Indexed by short id. Only the in-scope nodes (with classification). */
  scoped: ReadonlyMap<string, { node: RawNode; classification: Classification }>;
  /** Set of class IDs that are Enumerations (subclass-chain reaches schema:Enumeration). */
  enumerationClassIds: ReadonlySet<string>;
  /** Diagnostic: ids included only because they were ancestors of in-scope Types. */
  metaAncestorIds: ReadonlySet<string>;
}

const HEALTH_LIFESCI_LAYER = 'https://health-lifesci.schema.org';
const RDFS_CLASS = 'rdfs:Class';
const RDF_PROPERTY = 'rdf:Property';
const SCHEMA_ENUMERATION = 'schema:Enumeration';

export function filterGraph(graph: ReadonlyArray<RawNode>): FilterResult {
  // ── Stage 1: index all raw nodes by short id ────────────────────────────
  const rawById = new Map<string, RawNode>();
  for (const node of graph) {
    const id = toShortId(node['@id']);
    if (!id) continue;
    rawById.set(id, node);
  }

  // ── Stage 2: identify Enumeration classes ───────────────────────────────
  // An Enumeration class is any rdfs:Class whose subClassOf chain reaches
  // schema:Enumeration. We also include schema:Enumeration itself.
  const enumerationClassIds = new Set<string>([SCHEMA_ENUMERATION]);
  const memo = new Map<string, boolean>();
  function isEnumerationClass(id: string): boolean {
    if (memo.has(id)) return memo.get(id)!;
    if (id === SCHEMA_ENUMERATION) {
      memo.set(id, true);
      return true;
    }
    const node = rawById.get(id);
    if (!node) {
      memo.set(id, false);
      return false;
    }
    const parents = toIdArray(node['rdfs:subClassOf']);
    if (parents.length === 0) {
      memo.set(id, false);
      return false;
    }
    // Mark current as false during traversal to break cycles.
    memo.set(id, false);
    const result = parents.some((parentId) => isEnumerationClass(parentId));
    memo.set(id, result);
    return result;
  }
  for (const id of rawById.keys()) {
    if (isEnumerationClass(id)) enumerationClassIds.add(id);
  }

  // ── Stage 3: classify each node by kind ─────────────────────────────────
  function classifyKind(node: RawNode): ResolvedKind | null {
    const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
    if (types.includes(RDF_PROPERTY)) return 'Property';
    if (types.includes(RDFS_CLASS)) {
      const id = toShortId(node['@id'])!;
      return enumerationClassIds.has(id) ? 'Enumeration' : 'Type';
    }
    // Otherwise, see if any of the types is an Enumeration class — then this
    // node is an EnumerationMember of that class.
    for (const t of types) {
      if (enumerationClassIds.has(t)) return 'EnumerationMember';
    }
    return null;
  }

  // ── Stage 4: select primary in-scope nodes ──────────────────────────────
  const scoped = new Map<string, { node: RawNode; classification: Classification }>();

  for (const [id, node] of rawById) {
    const kind = classifyKind(node);
    if (!kind) continue;

    const partOf = node['schema:isPartOf']?.['@id'];
    const isHealthLifesci = partOf === HEALTH_LIFESCI_LAYER;
    // Core-allowlist matches when the id is on the named list AND the term
    // isn't already in health-lifesci (which would mean it's already counted).
    // Pending-namespace terms are accepted — schema.org puts terms like
    // HealthInsurancePlan in `pending.schema.org` even though they're stable.
    const isCoreAllowlist = !isHealthLifesci && CORE_TYPE_SET.has(id);

    if (isHealthLifesci) {
      scoped.set(id, {
        node,
        classification: {
          kind,
          inScope: true,
          source: 'health-lifesci',
          layer: 'health-lifesci',
        },
      });
    } else if (isCoreAllowlist) {
      scoped.set(id, {
        node,
        classification: {
          kind,
          inScope: true,
          source: 'core-allowlist',
          layer: 'core',
        },
      });
    }
  }

  // ── Stage 5: pull in meta ancestors so breadcrumbs resolve ─────────────
  // For every selected Type/Enumeration, walk subClassOf upward; if an
  // ancestor isn't already scoped, include it as layer='meta'.
  const metaAncestorIds = new Set<string>();
  const queue: string[] = [];
  for (const [id, entry] of scoped) {
    if (entry.classification.kind === 'Type' || entry.classification.kind === 'Enumeration') {
      queue.push(id);
    }
  }
  while (queue.length > 0) {
    const current = queue.shift()!;
    const node = rawById.get(current);
    if (!node) continue;
    const parents = toIdArray(node['rdfs:subClassOf']);
    for (const parentId of parents) {
      if (scoped.has(parentId)) continue;
      const parentNode = rawById.get(parentId);
      if (!parentNode) continue;
      const parentKind = classifyKind(parentNode);
      if (parentKind !== 'Type' && parentKind !== 'Enumeration') continue;
      scoped.set(parentId, {
        node: parentNode,
        classification: {
          kind: parentKind,
          inScope: true,
          source: 'meta-ancestor',
          layer: 'meta',
        },
      });
      metaAncestorIds.add(parentId);
      queue.push(parentId);
    }
  }

  return {
    rawById,
    scoped,
    enumerationClassIds,
    metaAncestorIds,
  };
}
