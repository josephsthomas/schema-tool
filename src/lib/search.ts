import Fuse from 'fuse.js';
import { dataset } from '@/data/schema.generated';
import type { SchemaTerm, TermKind } from '@/types/schema-org';

export interface SearchableTerm {
  id: string;
  name: string;
  kind: TermKind;
  description: string;
  category?: string;
  searchText: string;
}

const TERMS: SearchableTerm[] = (() => {
  const out: SearchableTerm[] = [];
  for (const term of Object.values(dataset.termsById) as SchemaTerm[]) {
    if (term.layer === 'meta') continue;
    let parents = '';
    if (term.kind === 'Type' || term.kind === 'Enumeration') {
      parents = term.parents.join(' ');
    }
    let domains = '';
    if (term.kind === 'Property') {
      domains = [...term.domainIncludes, ...term.rangeIncludes].join(' ');
    }
    out.push({
      id: term.id,
      name: term.name,
      kind: term.kind,
      description: term.description,
      searchText: `${term.name} ${term.description} ${parents} ${domains}`,
    });
  }
  return out;
})();

const FUSE = new Fuse(TERMS, {
  includeScore: true,
  threshold: 0.35,
  ignoreLocation: true,
  keys: [
    { name: 'name', weight: 3 },
    { name: 'description', weight: 1 },
    { name: 'searchText', weight: 0.5 },
  ],
});

export function searchTerms(query: string, limit = 30): SearchableTerm[] {
  if (!query.trim()) return [];
  const results = FUSE.search(query, { limit });
  return results.map((r) => r.item);
}

export function getAllTerms(): readonly SearchableTerm[] {
  return TERMS;
}
