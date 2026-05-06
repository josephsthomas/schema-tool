import { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FormFromType } from '@/components/Generator/FormFromType';
import { JsonLdPreview } from '@/components/Generator/JsonLdPreview';
import { useDataset } from '@/hooks/useDataset';
import { buildJsonLd } from '@/lib/jsonld-build';
import { validateFormState } from '@/lib/jsonld-validate';
import { requiredFor, recommendedFor } from '@/lib/google-rich-results';
import { bareName, toSchemaId } from '@/lib/utils';
import { pathForTerm } from '@/lib/routing';
import { addEntity, useHydrate, useWorkspace, selectedBundle } from '@/lib/workspace-store';
import type { FormState } from '@/lib/jsonld-build';
import type { SchemaType } from '@/types/schema-org';

export function GeneratorRoute() {
  useHydrate();
  const ws = useWorkspace();
  const dataset = useDataset();
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get('type');
  const initialId = requested ? toSchemaId(requested) : 'schema:Drug';

  const [state, setState] = useState<FormState>(() => ({
    rootTypeId: initialId,
    entries: {},
  }));
  const [savedToast, setSavedToast] = useState<string | null>(null);
  const bundle = selectedBundle(ws);

  async function saveToWorkspace() {
    if (!bundle) return;
    await addEntity(bundle.id, state);
    setSavedToast(`Saved to bundle "${bundle.name}"`);
    setTimeout(() => setSavedToast(null), 2200);
  }

  const types = useMemo(() => {
    return dataset.byKind.Type.map((id) => dataset.termsById[id])
      .filter((t): t is SchemaType => !!t && (t.kind === 'Type' || t.kind === 'Enumeration'))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [dataset]);

  const currentType = (dataset.termsById[state.rootTypeId] as SchemaType | undefined) ?? undefined;

  const jsonld = useMemo(() => buildJsonLd(state), [state]);
  const issues = useMemo(
    () =>
      currentType
        ? validateFormState(state, {
            requiredProps: requiredFor(currentType.id),
            recommendedProps: recommendedFor(currentType.id),
          })
        : [],
    [state, currentType],
  );
  const errors = issues.filter((i) => i.severity === 'error');
  const warnings = issues.filter((i) => i.severity === 'warning');

  function changeType(newId: string) {
    setState({ rootTypeId: newId, entries: {} });
    setSearchParams({ type: bareName(newId) });
  }

  return (
    <div className="py-10 md:py-14">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-[var(--color-accent)]">Generator</p>
          <h1 className="mt-1.5 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            Build valid JSON-LD
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Pick a type, fill its required and optional fields, copy or download valid JSON-LD.
            The Generator does not analyze or sanitize your content — editorial and MLR review
            remain your job.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {currentType && (
            <Link
              to={pathForTerm(currentType.id, currentType.kind)}
              className="text-sm text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
            >
              View {bareName(currentType.id)} reference
            </Link>
          )}
          <Button variant="outline" size="default" onClick={() => setState((s) => ({ ...s, entries: {} }))}>
            Clear fields
          </Button>
          <Button
            variant="pill"
            size="default"
            onClick={() => void saveToWorkspace()}
            disabled={!bundle}
            title={bundle ? undefined : 'Open Workspace to create a bundle first'}
          >
            <Save className="mr-1.5 h-3.5 w-3.5" />
            Save to Workspace
          </Button>
        </div>
      </header>
      {savedToast && (
        <div className="mb-6 rounded-md border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
          {savedToast}
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <section>
          <div className="mb-6">
            <label className="mb-1.5 block text-sm font-medium">Type</label>
            <Select
              className="w-full max-w-md"
              value={state.rootTypeId}
              onChange={(e) => changeType(e.target.value)}
            >
              {types.map((t) => (
                <option key={t.id} value={t.id}>
                  {bareName(t.id)}
                </option>
              ))}
            </Select>
          </div>

          {currentType ? (
            <FormFromType type={currentType} state={state} onChange={setState} />
          ) : (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Pick a type to begin.</p>
          )}
        </section>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <JsonLdPreview value={jsonld} />
          <div className="rounded-lg border border-zinc-200 p-4 text-xs dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-zinc-500">Validation</span>
              {errors.length === 0 && warnings.length === 0 ? (
                <Badge variant="outline" className="text-[10px]">
                  OK
                </Badge>
              ) : (
                <>
                  {errors.length > 0 && (
                    <Badge variant="destructive" className="text-[10px]">
                      {errors.length} error{errors.length === 1 ? '' : 's'}
                    </Badge>
                  )}
                  {warnings.length > 0 && (
                    <Badge variant="warning" className="text-[10px]">
                      {warnings.length} warning{warnings.length === 1 ? '' : 's'}
                    </Badge>
                  )}
                </>
              )}
            </div>
            {issues.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {issues.map((iss, i) => (
                  <li
                    key={i}
                    className={
                      iss.severity === 'error'
                        ? 'text-red-700 dark:text-red-400'
                        : 'text-amber-700 dark:text-amber-400'
                    }
                  >
                    <span className="font-mono">{iss.propertyName}</span> — {iss.message}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
