/**
 * Bucket a Type's properties into Required / Recommended / Advanced groups
 * for the Generator form layout, per build brief Section 7.1.
 *
 * - Required + Recommended are derived from src/data/google-rich-results.json
 *   (hand-curated per Type).
 * - Everything else falls into Advanced.
 * - Direct properties are listed before inherited within each group.
 */

import { requiredFor, recommendedFor } from '@/lib/google-rich-results';
import { bareName } from '@/lib/utils';
import type { SchemaType } from '@/types/schema-org';

export interface PropertyGroups {
  required: string[];
  recommended: string[];
  advanced: string[];
}

export function groupProperties(type: SchemaType): PropertyGroups {
  const reqSet = new Set(requiredFor(type.id));
  const recSet = new Set(recommendedFor(type.id));

  const required: string[] = [];
  const recommended: string[] = [];
  const advanced: string[] = [];

  const allProps = [...type.directProperties, ...type.inheritedProperties];
  const seen = new Set<string>();

  for (const propId of allProps) {
    if (seen.has(propId)) continue;
    seen.add(propId);
    const propName = bareName(propId);
    if (reqSet.has(propName)) required.push(propId);
    else if (recSet.has(propName)) recommended.push(propId);
    else advanced.push(propId);
  }

  return { required, recommended, advanced };
}
