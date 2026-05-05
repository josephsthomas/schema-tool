/**
 * Lookup helpers for the hand-curated Google rich-results annotations under
 * src/data/google-rich-results.json.
 */

import richResults from '@/data/google-rich-results.json';
import { bareName } from '@/lib/utils';

export type Annotation = 'required' | 'recommended';

interface RichResults {
  annotations: Record<string, Record<string, Annotation>>;
}

const data = richResults as unknown as RichResults;

export function statusFor(typeId: string, propertyName: string): Annotation | undefined {
  const entry = data.annotations[typeId];
  if (!entry) return undefined;
  // accept both bare and prefixed forms in JSON, but our convention is bare.
  return entry[propertyName] ?? entry[bareName(propertyName)];
}

export function requiredFor(typeId: string): readonly string[] {
  const entry = data.annotations[typeId] ?? {};
  return Object.entries(entry)
    .filter(([, v]) => v === 'required')
    .map(([k]) => k);
}

export function recommendedFor(typeId: string): readonly string[] {
  const entry = data.annotations[typeId] ?? {};
  return Object.entries(entry)
    .filter(([, v]) => v === 'recommended')
    .map(([k]) => k);
}
