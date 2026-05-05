/**
 * Bucket a Type's properties into Required / Optional groups for the
 * Generator form. The required set is curated per-Type in
 * src/data/google-rich-results.json (annotated for all 94 Types as of
 * 2026-05-05). Everything else is optional and collapsed by default.
 */

import { requiredFor, recommendedFor } from '@/lib/google-rich-results';
import { bareName } from '@/lib/utils';
import type { SchemaType } from '@/types/schema-org';

export interface PropertyGroups {
  required: string[];
  optional: string[];
}

export function groupProperties(type: SchemaType): PropertyGroups {
  const reqSet = new Set([...requiredFor(type.id), ...recommendedFor(type.id)]);

  const required: string[] = [];
  const optional: string[] = [];

  const allProps = [...type.directProperties, ...type.inheritedProperties];
  const seen = new Set<string>();

  // Pull required props out in the curated annotation order, so the Generator
  // shows them in editor-defined order (e.g. name → description → code), not
  // schema.org's alphabetical/inheritance order.
  const annotatedOrder = requiredFor(type.id);
  const orderIndex = new Map(annotatedOrder.map((n, i) => [n, i]));

  for (const propId of allProps) {
    if (seen.has(propId)) continue;
    seen.add(propId);
    const propName = bareName(propId);
    if (reqSet.has(propName)) required.push(propId);
    else optional.push(propId);
  }

  required.sort((a, b) => {
    const ai = orderIndex.get(bareName(a)) ?? 999;
    const bi = orderIndex.get(bareName(b)) ?? 999;
    return ai - bi;
  });

  return { required, optional };
}
