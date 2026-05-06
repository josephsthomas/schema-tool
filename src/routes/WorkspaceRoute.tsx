import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Copy as CopyIcon, ChevronUp, ChevronDown, FileDown, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  useHydrate,
  useWorkspace,
  selectedBundle,
  createBundle,
  selectBundle,
  renameBundle,
  duplicateBundle,
  deleteBundle,
  removeEntity,
  reorderEntities,
  addEntity,
  updateBundle,
} from '@/lib/workspace-store';
import { COMBO_TEMPLATES } from '@/lib/combo-templates';
import { useDataset } from '@/hooks/useDataset';
import { bareName, slugify, toSchemaId } from '@/lib/utils';
import type { FormState } from '@/lib/jsonld-build';

export function WorkspaceRoute() {
  useHydrate();
  const ws = useWorkspace();
  const dataset = useDataset();
  const bundle = useMemo(() => selectedBundle(ws), [ws]);
  const [renaming, setRenaming] = useState(false);
  const [tempName, setTempName] = useState('');

  if (ws.loading) {
    return <p className="px-6 py-12 text-sm text-zinc-600">Loading workspace…</p>;
  }

  return (
    <div className="grid gap-8 py-10 md:py-14 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-medium text-zinc-500">Bundles</h2>
          <Button size="sm" variant="outline" className="h-7 px-2" onClick={() => void createBundle('Untitled')}>
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <ul className="space-y-1">
          {ws.bundles.map((b) => (
            <li key={b.id}>
              <button
                type="button"
                onClick={() => void selectBundle(b.id)}
                className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                  b.id === ws.selectedBundleId
                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                    : 'text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900'
                }`}
              >
                <span className="truncate">{b.name}</span>
                <Badge variant="outline" className="ml-2 text-[10px]">
                  {b.entities.length}
                </Badge>
              </button>
            </li>
          ))}
        </ul>
        <div className="pt-4">
          <h3 className="mb-2 text-xs font-medium text-zinc-500">Combo templates</h3>
          <ul className="space-y-1">
            {COMBO_TEMPLATES.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  className="w-full rounded-md border border-zinc-200 px-2 py-1.5 text-left text-xs text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  onClick={() => {
                    if (!bundle) return;
                    void instantiateCombo(c, bundle.id);
                  }}
                  disabled={!bundle}
                  title={c.description}
                >
                  <Package className="mr-1 inline h-3 w-3" />
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <section className="min-w-0">
        {!bundle ? (
          <p className="text-sm text-zinc-600">Create a bundle to begin.</p>
        ) : (
          <div>
            <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                {renaming ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      void renameBundle(bundle.id, tempName || bundle.name);
                      setRenaming(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Input
                      autoFocus
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="w-72"
                    />
                    <Button size="sm" type="submit">Save</Button>
                    <Button size="sm" variant="outline" onClick={() => setRenaming(false)}>
                      Cancel
                    </Button>
                  </form>
                ) : (
                  <h1
                    className="cursor-text text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
                    onDoubleClick={() => {
                      setTempName(bundle.name);
                      setRenaming(true);
                    }}
                  >
                    {bundle.name}
                  </h1>
                )}
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  {bundle.entities.length} entit{bundle.entities.length === 1 ? 'y' : 'ies'} · slug{' '}
                  <code>{bundle.slug}</code>
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setTempName(bundle.name);
                    setRenaming(true);
                  }}
                >
                  Rename
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => void duplicateBundle(bundle.id)}
                >
                  <CopyIcon className="mr-1 h-3 w-3" /> Duplicate
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    if (confirm(`Delete bundle "${bundle.name}"? This cannot be undone.`)) {
                      void deleteBundle(bundle.id);
                    }
                  }}
                >
                  <Trash2 className="mr-1 h-3 w-3" /> Delete
                </Button>
                <Link to="/export">
                  <Button size="sm" variant="accent">
                    <FileDown className="mr-1 h-3 w-3" /> Export ZIP
                  </Button>
                </Link>
              </div>
            </header>

            <div className="mb-10 rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
              <h3 className="mb-3 text-xs font-medium text-zinc-500">Bundle settings</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <Label className="text-xs">Production URL prefix</Label>
                  <Input
                    type="url"
                    placeholder="https://example.com/drugs"
                    value={bundle.idBaseUrl ?? ''}
                    onChange={(e) => void updateBundle(bundle.id, { idBaseUrl: e.target.value || undefined })}
                  />
                  <p className="mt-1 text-[11px] text-zinc-500">
                    Used to prefix \`@id\` values. Without this, exported \`@id\`s use the
                    \`urn:schema-tool:\` scheme.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="mb-3 text-xs font-medium text-zinc-500">Entities</h3>
            {bundle.entities.length === 0 ? (
              <div className="rounded-md border border-dashed border-zinc-300 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
                <p>No entities yet. Build one in the Generator and click "Save to Workspace", or
                instantiate a combo template from the left sidebar.</p>
                <Link to="/generator" className="mt-3 inline-block underline">
                  Open Generator →
                </Link>
              </div>
            ) : (
              <ul className="space-y-2">
                {bundle.entities.map((e, i) => {
                  const term = dataset.termsById[e.rootTypeId];
                  const nameVal = e.state.entries.name;
                  const displayName =
                    nameVal && nameVal.kind === 'text' && nameVal.value.trim()
                      ? nameVal.value.trim()
                      : `(unnamed ${term?.name ?? bareName(e.rootTypeId)})`;
                  return (
                    <li
                      key={e.id}
                      className="flex items-center justify-between rounded-md border border-zinc-200 p-3 dark:border-zinc-800"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px]">
                            {bareName(e.rootTypeId)}
                          </Badge>
                          <span className="truncate font-medium">{displayName}</span>
                        </div>
                        <p className="mt-1 truncate text-[11px] text-zinc-500">
                          slug: {slugify(displayName) || e.id}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0"
                          disabled={i === 0}
                          onClick={() => {
                            const ids = [...bundle.entities.map((x) => x.id)];
                            [ids[i - 1], ids[i]] = [ids[i], ids[i - 1]];
                            void reorderEntities(bundle.id, ids);
                          }}
                        >
                          <ChevronUp className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0"
                          disabled={i === bundle.entities.length - 1}
                          onClick={() => {
                            const ids = [...bundle.entities.map((x) => x.id)];
                            [ids[i + 1], ids[i]] = [ids[i], ids[i + 1]];
                            void reorderEntities(bundle.id, ids);
                          }}
                        >
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => void removeEntity(bundle.id, e.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

async function instantiateCombo(combo: { entities: { type: string }[] }, bundleId: string): Promise<void> {
  for (const e of combo.entities) {
    const typeId = toSchemaId(e.type);
    const state: FormState = { rootTypeId: typeId, entries: {} };
    // eslint-disable-next-line no-await-in-loop
    await addEntity(bundleId, state);
  }
}

// silence unused import warning if Select isn't used.
void Select;
