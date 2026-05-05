/**
 * Workspace store: bundles of generator entities, persisted to IndexedDB via
 * idb-keyval. Built per build brief Phase 6 / plan §6.1.
 *
 * - Multiple bundles supported (project-level scoping). One default bundle
 *   "Untitled" on first use.
 * - Each bundle has an id, name, slug, createdAt/updatedAt timestamps, and
 *   an ordered list of entities.
 * - Each entity carries a stable id (used in @id refs), the rootTypeId, and
 *   the FormState that produced it.
 *
 * Hydration is asynchronous; `useWorkspace()` returns a `loading` flag while
 * IndexedDB is being read on first mount.
 */

import { useEffect, useSyncExternalStore } from 'react';
import { get, set, del, keys } from 'idb-keyval';
import type { FormState } from '@/lib/jsonld-build';
import { slugify } from '@/lib/utils';

export interface WorkspaceEntity {
  id: string;
  rootTypeId: string;
  state: FormState;
  createdAt: string;
  updatedAt: string;
}

export interface Bundle {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  entities: WorkspaceEntity[];
  /** Optional production URL prefix used when exporting. Falls back to the urn scheme. */
  idBaseUrl?: string;
}

interface SettingsRecord {
  selectedBundleId: string | null;
}

const BUNDLE_KEY_PREFIX = 'schema-tool:bundle:';
const SETTINGS_KEY = 'schema-tool:settings';

let bundles: Bundle[] = [];
let selectedBundleId: string | null = null;
let loading = true;
let hydrated = false;
const listeners = new Set<() => void>();
let snapshot: WorkspaceState = computeSnapshot();

interface WorkspaceState {
  bundles: Bundle[];
  selectedBundleId: string | null;
  loading: boolean;
}

function computeSnapshot(): WorkspaceState {
  return { bundles, selectedBundleId, loading };
}

function emit() {
  snapshot = computeSnapshot();
  for (const l of listeners) l();
}

async function persistBundle(b: Bundle) {
  await set(`${BUNDLE_KEY_PREFIX}${b.id}`, b);
}

async function persistSettings() {
  const settings: SettingsRecord = { selectedBundleId };
  await set(SETTINGS_KEY, settings);
}

export async function hydrate(): Promise<void> {
  if (hydrated) return;
  hydrated = true;
  try {
    const allKeys = await keys();
    const bundleKeys = allKeys.filter(
      (k): k is string => typeof k === 'string' && k.startsWith(BUNDLE_KEY_PREFIX),
    );
    const loaded: Bundle[] = [];
    for (const k of bundleKeys) {
      const v = (await get(k)) as Bundle | undefined;
      if (v) loaded.push(v);
    }
    loaded.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    bundles = loaded;

    const settings = (await get(SETTINGS_KEY)) as SettingsRecord | undefined;
    selectedBundleId = settings?.selectedBundleId ?? bundles[0]?.id ?? null;

    if (bundles.length === 0) {
      const initial = createBundleObj('Untitled');
      bundles = [initial];
      selectedBundleId = initial.id;
      await persistBundle(initial);
      await persistSettings();
    }
  } catch (err) {
    console.error('workspace hydrate failed', err);
  } finally {
    loading = false;
    emit();
  }
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): WorkspaceState {
  return snapshot;
}

export function useWorkspace(): WorkspaceState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function useHydrate() {
  useEffect(() => {
    void hydrate();
  }, []);
}

function nowIso() {
  return new Date().toISOString();
}

function randomId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function createBundleObj(name: string): Bundle {
  const id = randomId('bundle');
  return {
    id,
    name,
    slug: slugify(name) || 'untitled',
    createdAt: nowIso(),
    updatedAt: nowIso(),
    entities: [],
  };
}

export async function createBundle(name = 'Untitled'): Promise<Bundle> {
  const b = createBundleObj(name);
  bundles = [...bundles, b];
  selectedBundleId = b.id;
  await persistBundle(b);
  await persistSettings();
  emit();
  return b;
}

export async function selectBundle(id: string): Promise<void> {
  if (!bundles.find((b) => b.id === id)) return;
  selectedBundleId = id;
  await persistSettings();
  emit();
}

export async function renameBundle(id: string, name: string): Promise<void> {
  bundles = bundles.map((b) =>
    b.id === id
      ? { ...b, name, slug: slugify(name) || b.slug, updatedAt: nowIso() }
      : b,
  );
  const updated = bundles.find((b) => b.id === id);
  if (updated) await persistBundle(updated);
  emit();
}

export async function deleteBundle(id: string): Promise<void> {
  bundles = bundles.filter((b) => b.id !== id);
  if (selectedBundleId === id) selectedBundleId = bundles[0]?.id ?? null;
  await del(`${BUNDLE_KEY_PREFIX}${id}`);
  await persistSettings();
  emit();
}

export async function duplicateBundle(id: string): Promise<Bundle | undefined> {
  const original = bundles.find((b) => b.id === id);
  if (!original) return undefined;
  const copy: Bundle = {
    ...original,
    id: randomId('bundle'),
    name: `${original.name} (copy)`,
    slug: `${original.slug}-copy`,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    entities: original.entities.map((e) => ({
      ...e,
      id: randomId('entity'),
      createdAt: nowIso(),
      updatedAt: nowIso(),
    })),
  };
  bundles = [...bundles, copy];
  selectedBundleId = copy.id;
  await persistBundle(copy);
  await persistSettings();
  emit();
  return copy;
}

export async function updateBundle(
  id: string,
  patch: Partial<Pick<Bundle, 'name' | 'idBaseUrl'>>,
): Promise<void> {
  bundles = bundles.map((b) => {
    if (b.id !== id) return b;
    const next = { ...b, ...patch, updatedAt: nowIso() };
    if (patch.name) next.slug = slugify(patch.name) || b.slug;
    return next;
  });
  const updated = bundles.find((b) => b.id === id);
  if (updated) await persistBundle(updated);
  emit();
}

export async function addEntity(bundleId: string, state: FormState): Promise<WorkspaceEntity> {
  const e: WorkspaceEntity = {
    id: randomId('entity'),
    rootTypeId: state.rootTypeId,
    state,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  bundles = bundles.map((b) =>
    b.id === bundleId ? { ...b, entities: [...b.entities, e], updatedAt: nowIso() } : b,
  );
  const updated = bundles.find((b) => b.id === bundleId);
  if (updated) await persistBundle(updated);
  emit();
  return e;
}

export async function updateEntity(
  bundleId: string,
  entityId: string,
  state: FormState,
): Promise<void> {
  bundles = bundles.map((b) =>
    b.id === bundleId
      ? {
          ...b,
          entities: b.entities.map((e) =>
            e.id === entityId
              ? { ...e, state, rootTypeId: state.rootTypeId, updatedAt: nowIso() }
              : e,
          ),
          updatedAt: nowIso(),
        }
      : b,
  );
  const updated = bundles.find((b) => b.id === bundleId);
  if (updated) await persistBundle(updated);
  emit();
}

export async function removeEntity(bundleId: string, entityId: string): Promise<void> {
  bundles = bundles.map((b) =>
    b.id === bundleId
      ? { ...b, entities: b.entities.filter((e) => e.id !== entityId), updatedAt: nowIso() }
      : b,
  );
  const updated = bundles.find((b) => b.id === bundleId);
  if (updated) await persistBundle(updated);
  emit();
}

export async function reorderEntities(bundleId: string, orderedIds: string[]): Promise<void> {
  bundles = bundles.map((b) => {
    if (b.id !== bundleId) return b;
    const byId = new Map(b.entities.map((e) => [e.id, e]));
    const reordered = orderedIds.map((id) => byId.get(id)).filter((e): e is WorkspaceEntity => !!e);
    // append any entities missing from the orderedIds list (defensive).
    for (const e of b.entities) if (!orderedIds.includes(e.id)) reordered.push(e);
    return { ...b, entities: reordered, updatedAt: nowIso() };
  });
  const updated = bundles.find((b) => b.id === bundleId);
  if (updated) await persistBundle(updated);
  emit();
}

export function selectedBundle(state: WorkspaceState): Bundle | undefined {
  return state.bundles.find((b) => b.id === state.selectedBundleId);
}
