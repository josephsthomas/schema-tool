import type { TermKind } from '@/types/schema-org';
import { bareName, toSchemaId } from './utils';

/** Map a TermKind to its base route segment. */
export function routeForKind(kind: TermKind): string {
  switch (kind) {
    case 'Type':
    case 'Enumeration':
      return '/Type';
    case 'Property':
      return '/Property';
    case 'EnumerationMember':
      return '/Enumeration';
  }
}

/** Build a clean URL for a term: e.g. "schema:Drug" → "/Type/Drug". */
export function pathForTerm(id: string, kind: TermKind, parentEnumerationId?: string): string {
  const bare = bareName(id);
  if (kind === 'EnumerationMember') {
    const parent = parentEnumerationId ? bareName(parentEnumerationId) : 'Unknown';
    return `/Enumeration/${parent}/${bare}`;
  }
  return `${routeForKind(kind)}/${bare}`;
}

export { bareName, toSchemaId };
