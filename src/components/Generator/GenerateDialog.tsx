import { useMemo, useState } from 'react';
import { Download, AlertTriangle, CheckCircle2, Save } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormFromType } from '@/components/Generator/FormFromType';
import { JsonLdPreview } from '@/components/Generator/JsonLdPreview';
import { buildJsonLd } from '@/lib/jsonld-build';
import { validateFormState } from '@/lib/jsonld-validate';
import { requiredFor, recommendedFor } from '@/lib/google-rich-results';
import { addEntity, useHydrate, useWorkspace, selectedBundle } from '@/lib/workspace-store';
import { downloadBlob } from '@/lib/export-bundle';
import { bareName, slugify } from '@/lib/utils';
import type { FormState } from '@/lib/jsonld-build';
import type { SchemaType } from '@/types/schema-org';

interface GenerateDialogProps {
  type: SchemaType;
  trigger: React.ReactNode;
}

export function GenerateDialog({ type, trigger }: GenerateDialogProps) {
  useHydrate();
  const ws = useWorkspace();
  const bundle = selectedBundle(ws);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<FormState>(() => ({ rootTypeId: type.id, entries: {} }));
  const [savedToast, setSavedToast] = useState<string | null>(null);

  const jsonld = useMemo(() => buildJsonLd(state), [state]);
  const jsonString = useMemo(() => JSON.stringify(jsonld, null, 2), [jsonld]);
  const issues = useMemo(
    () =>
      validateFormState(state, {
        requiredProps: requiredFor(type.id),
        recommendedProps: recommendedFor(type.id),
      }),
    [state, type.id],
  );
  const errors = issues.filter((i) => i.severity === 'error');
  const warnings = issues.filter((i) => i.severity === 'warning');

  function downloadJson() {
    const nameField = state.entries.name;
    const baseName =
      nameField && nameField.kind === 'text' && nameField.value.trim()
        ? slugify(nameField.value.trim())
        : slugify(bareName(type.id));
    const filename = `${baseName || 'entity'}.jsonld`;
    const blob = new Blob([jsonString + '\n'], { type: 'application/ld+json' });
    downloadBlob(blob, filename);
  }

  async function saveToWorkspace() {
    if (!bundle) return;
    await addEntity(bundle.id, state);
    setSavedToast(`Saved to bundle "${bundle.name}"`);
    setTimeout(() => setSavedToast(null), 2200);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) {
          // reset on close so reopening starts fresh; if Joe wants persistence we can add it.
          setState({ rootTypeId: type.id, entries: {} });
          setSavedToast(null);
        }
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="grid w-[min(96vw,1200px)] max-w-none grid-rows-[auto_minmax(0,1fr)_auto] gap-0 p-0 sm:rounded-lg max-h-[92vh]">
        <DialogHeader className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <DialogTitle className="text-xl font-semibold tracking-tight">
            Generate {bareName(type.id)}
          </DialogTitle>
          <DialogDescription>
            Fill the fields you need; the JSON-LD on the right updates live. Required fields are
            from Google's structured data documentation; everything else is optional.
          </DialogDescription>
        </DialogHeader>

        <div className="grid min-h-0 gap-0 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="overflow-y-auto px-6 py-5">
            <FormFromType type={type} state={state} onChange={setState} />
          </div>
          <aside className="border-t border-zinc-200 bg-zinc-50/50 px-6 py-5 dark:border-zinc-800 dark:bg-zinc-900/40 lg:border-l lg:border-t-0">
            <div className="lg:sticky lg:top-0 space-y-3">
              <JsonLdPreview value={jsonld} />
              <div className="rounded-md border border-zinc-200 bg-white p-3 text-xs dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-zinc-500">Validation</span>
                  {errors.length === 0 && warnings.length === 0 ? (
                    <Badge variant="outline" className="text-[10px]">
                      <CheckCircle2 className="mr-1 inline h-3 w-3" /> OK
                    </Badge>
                  ) : (
                    <>
                      {errors.length > 0 && (
                        <Badge variant="destructive" className="text-[10px]">
                          <AlertTriangle className="mr-1 inline h-3 w-3" />
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
                  <ul className="mt-2 space-y-1">
                    {issues.slice(0, 6).map((iss, i) => (
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
                    {issues.length > 6 && (
                      <li className="text-zinc-500">…and {issues.length - 6} more</li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </aside>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 px-6 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            {savedToast && (
              <span className="rounded-md border border-zinc-300 bg-zinc-50 px-2 py-1 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                {savedToast}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setState({ rootTypeId: type.id, entries: {} })}
            >
              Clear
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => void saveToWorkspace()}
              disabled={!bundle}
              title={bundle ? undefined : 'Open Workspace to create a bundle first'}
            >
              <Save className="mr-1 h-3 w-3" />
              Save to Workspace
            </Button>
            <Button variant="accent" size="sm" onClick={downloadJson}>
              <Download className="mr-1 h-3 w-3" />
              Download JSON
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
