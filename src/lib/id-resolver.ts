/**
 * Cross-entity @id resolution for Workspace bundles.
 *
 * When the user references one Workspace entity from another (e.g. setting
 * MedicalWebPage.mainEntity to point at a sibling MedicalCondition), the
 * generator inserts an `@id` link that needs to resolve consistently across
 * the bundle. Default scheme: `urn:schema-tool:<bundleSlug>:<entitySlug>`.
 *
 * On export, users can override with a real production URL prefix
 * (Bundle.idBaseUrl). All `@id` values are rewritten to that prefix at
 * export time.
 */

import { slugify } from '@/lib/utils';
import { bareName } from '@/lib/utils';
import type { Bundle, WorkspaceEntity } from '@/lib/workspace-store';

export function entitySlugFor(entity: WorkspaceEntity): string {
  const name = pickName(entity);
  if (name) return slugify(name);
  return `${slugify(bareName(entity.rootTypeId))}-${entity.id.slice(-6)}`;
}

function pickName(entity: WorkspaceEntity): string | null {
  const v = entity.state.entries.name;
  if (!v) return null;
  if (v.kind === 'text' && v.value.trim()) return v.value.trim();
  return null;
}

export function urnFor(bundle: Bundle, entity: WorkspaceEntity): string {
  return `urn:schema-tool:${bundle.slug}:${entitySlugFor(entity)}`;
}

export function publicUrlFor(bundle: Bundle, entity: WorkspaceEntity): string {
  if (!bundle.idBaseUrl) return urnFor(bundle, entity);
  const prefix = bundle.idBaseUrl.endsWith('/')
    ? bundle.idBaseUrl.slice(0, -1)
    : bundle.idBaseUrl;
  return `${prefix}/${entitySlugFor(entity)}`;
}
