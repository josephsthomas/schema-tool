/**
 * Build a JSON-LD object from the Generator form state.
 *
 * Form state shape: nested map keyed by property name. Type refs become
 * nested objects with `@type` and their own form state. Empty values are
 * elided so the output stays clean.
 */

import { bareName } from '@/lib/utils';

export type FieldValue =
  | { kind: 'text'; value: string }
  | { kind: 'number'; value: string }
  | { kind: 'boolean'; value: boolean }
  | { kind: 'url'; value: string }
  | { kind: 'date'; value: string }
  | { kind: 'datetime'; value: string }
  | { kind: 'time'; value: string }
  | { kind: 'duration'; value: string }
  | { kind: 'enumeration'; value: string } // "schema:Cardiovascular" form
  | { kind: 'quantity'; value: { value: string; unit: string } }
  | { kind: 'nested'; value: { typeId: string; entries: Record<string, FieldValue> } }
  | { kind: 'idref'; value: string };

export interface FormState {
  /** schema:Drug etc. — the @type of the root entity. */
  rootTypeId: string;
  /** Map of bare property name → field value. */
  entries: Record<string, FieldValue>;
  /** Optional URI for cross-entity references. Falls back to Workspace's @id scheme. */
  rootId?: string;
}

interface JsonLdContext {
  '@context': string;
  '@type': string;
  '@id'?: string;
  [propertyName: string]: unknown;
}

export function buildJsonLd(state: FormState): JsonLdContext {
  const out: JsonLdContext = {
    '@context': 'https://schema.org',
    '@type': bareName(state.rootTypeId),
  };
  if (state.rootId) out['@id'] = state.rootId;

  for (const [propName, value] of Object.entries(state.entries)) {
    const serialized = serialize(value);
    if (serialized !== undefined) {
      out[propName] = serialized;
    }
  }
  return out;
}

function serialize(value: FieldValue): unknown {
  switch (value.kind) {
    case 'text':
    case 'url':
    case 'date':
    case 'datetime':
    case 'time':
    case 'duration':
      return value.value.trim() || undefined;

    case 'number': {
      const trimmed = value.value.trim();
      if (!trimmed) return undefined;
      const n = Number(trimmed);
      return Number.isFinite(n) ? n : trimmed;
    }

    case 'boolean':
      return value.value;

    case 'enumeration':
      return value.value
        ? { '@type': bareName(value.value), name: bareName(value.value) }
        : undefined;

    case 'quantity':
      if (!value.value.value.trim() && !value.value.unit.trim()) return undefined;
      return {
        '@type': 'QuantitativeValue',
        value: value.value.value || undefined,
        unitText: value.value.unit || undefined,
      };

    case 'nested': {
      const inner = value.value;
      const entries = inner.entries;
      const obj: Record<string, unknown> = { '@type': bareName(inner.typeId) };
      let hasField = false;
      for (const [k, v] of Object.entries(entries)) {
        const s = serialize(v);
        if (s !== undefined) {
          obj[k] = s;
          hasField = true;
        }
      }
      return hasField ? obj : undefined;
    }

    case 'idref':
      return value.value ? { '@id': value.value } : undefined;

    default: {
      const _exhaustive: never = value;
      void _exhaustive;
      return undefined;
    }
  }
}

export function emptyFieldValueFor(kind: string): FieldValue {
  switch (kind) {
    case 'multiline':
    case 'text':
      return { kind: 'text', value: '' };
    case 'number':
    case 'integer':
      return { kind: 'number', value: '' };
    case 'boolean':
      return { kind: 'boolean', value: false };
    case 'url':
      return { kind: 'url', value: '' };
    case 'date':
      return { kind: 'date', value: '' };
    case 'datetime':
      return { kind: 'datetime', value: '' };
    case 'time':
      return { kind: 'time', value: '' };
    case 'duration':
      return { kind: 'duration', value: '' };
    case 'quantity':
      return { kind: 'quantity', value: { value: '', unit: '' } };
    case 'enumeration':
      return { kind: 'enumeration', value: '' };
    default:
      return { kind: 'text', value: '' };
  }
}
