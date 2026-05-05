import { dataset } from '@/data/schema.generated';
import type { SchemaDataset, SchemaTerm, SchemaType, SchemaProperty, SchemaEnumerationMember } from '@/types/schema-org';

export function useDataset(): SchemaDataset {
  return dataset;
}

export function useTermById(id: string | undefined): SchemaTerm | undefined {
  if (!id) return undefined;
  return dataset.termsById[id];
}

export function useTypeById(id: string | undefined): SchemaType | undefined {
  const term = useTermById(id);
  if (term && (term.kind === 'Type' || term.kind === 'Enumeration')) return term;
  return undefined;
}

export function usePropertyById(id: string | undefined): SchemaProperty | undefined {
  const term = useTermById(id);
  if (term?.kind === 'Property') return term;
  return undefined;
}

export function useEnumerationMemberById(id: string | undefined): SchemaEnumerationMember | undefined {
  const term = useTermById(id);
  if (term?.kind === 'EnumerationMember') return term;
  return undefined;
}
