/**
 * Map a Property's rangeIncludes into a discriminated FieldKind so the form
 * renderer can pick the right widget (text, number, date, dropdown, nested
 * entity form, etc.) per build brief Section 7.1.
 */

import type { SchemaTerm } from '@/types/schema-org';

export type FieldKind =
  | { kind: 'text' }
  | { kind: 'multiline' }
  | { kind: 'number' }
  | { kind: 'integer' }
  | { kind: 'boolean' }
  | { kind: 'url' }
  | { kind: 'date' }
  | { kind: 'datetime' }
  | { kind: 'time' }
  | { kind: 'duration' }
  | { kind: 'quantity' }
  | { kind: 'enumeration'; enumerationId: string }
  | { kind: 'nested'; typeIds: string[] }
  | { kind: 'unknown'; rangeIds: string[] };

const TEXT_RANGES = new Set(['schema:Text', 'schema:CssSelectorType', 'schema:XPathType', 'schema:PronounceableText']);
const MULTILINE_RANGES = new Set(['schema:CssSelectorType', 'schema:XPathType']);
const URL_RANGES = new Set(['schema:URL']);
const NUMBER_RANGES = new Set(['schema:Number', 'schema:Float']);
const INTEGER_RANGES = new Set(['schema:Integer']);
const BOOL_RANGES = new Set(['schema:Boolean']);
const DATE_RANGES = new Set(['schema:Date']);
const DATETIME_RANGES = new Set(['schema:DateTime']);
const TIME_RANGES = new Set(['schema:Time']);
const DURATION_RANGES = new Set(['schema:Duration']);
const QUANTITY_RANGES = new Set([
  'schema:QuantitativeValue',
  'schema:Quantity',
  'schema:Mass',
  'schema:Distance',
  'schema:Energy',
]);

export function classifyRange(
  rangeIncludes: readonly string[],
  termsById: Record<string, SchemaTerm>,
): FieldKind {
  if (rangeIncludes.length === 0) return { kind: 'unknown', rangeIds: [] };

  // 1. Single primitive ranges — fastest path.
  if (rangeIncludes.length === 1) {
    const r = rangeIncludes[0];
    if (TEXT_RANGES.has(r)) return { kind: MULTILINE_RANGES.has(r) ? 'multiline' : 'text' };
    if (URL_RANGES.has(r)) return { kind: 'url' };
    if (NUMBER_RANGES.has(r)) return { kind: 'number' };
    if (INTEGER_RANGES.has(r)) return { kind: 'integer' };
    if (BOOL_RANGES.has(r)) return { kind: 'boolean' };
    if (DATE_RANGES.has(r)) return { kind: 'date' };
    if (DATETIME_RANGES.has(r)) return { kind: 'datetime' };
    if (TIME_RANGES.has(r)) return { kind: 'time' };
    if (DURATION_RANGES.has(r)) return { kind: 'duration' };
    if (QUANTITY_RANGES.has(r)) return { kind: 'quantity' };
  }

  // 2. Single enumeration target.
  for (const r of rangeIncludes) {
    const t = termsById[r];
    if (t && t.kind === 'Enumeration') {
      return { kind: 'enumeration', enumerationId: r };
    }
  }

  // 3. Quantity-ish if any range is QuantitativeValue.
  if (rangeIncludes.some((r) => QUANTITY_RANGES.has(r))) {
    return { kind: 'quantity' };
  }

  // 4. Mixed: Text + Type ref → pick text (forms can stretch); else nested.
  const hasText = rangeIncludes.some((r) => TEXT_RANGES.has(r));
  const typeIds = rangeIncludes.filter((r) => {
    const t = termsById[r];
    return t && (t.kind === 'Type' || t.kind === 'Enumeration');
  });

  if (typeIds.length > 0) {
    return { kind: 'nested', typeIds };
  }

  if (hasText) return { kind: 'text' };

  return { kind: 'unknown', rangeIds: [...rangeIncludes] };
}
