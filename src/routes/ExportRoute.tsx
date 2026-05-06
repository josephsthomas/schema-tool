import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileDown, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useHydrate, useWorkspace, selectedBundle, updateBundle } from '@/lib/workspace-store';
import { buildBundleZip, downloadBlob } from '@/lib/export-bundle';
import { validateFormState } from '@/lib/jsonld-validate';
import { requiredFor, recommendedFor } from '@/lib/google-rich-results';
import { bareName } from '@/lib/utils';

export function ExportRoute() {
  useHydrate();
  const ws = useWorkspace();
  const bundle = useMemo(() => selectedBundle(ws), [ws]);
  const [agencyCredit, setAgencyCredit] = useState('');
  const [busy, setBusy] = useState(false);
  const [lastFile, setLastFile] = useState<string | null>(null);

  const issues = useMemo(() => {
    if (!bundle) return [] as { entityName: string; errors: number; warnings: number }[];
    return bundle.entities.map((e) => {
      const result = validateFormState(e.state, {
        requiredProps: requiredFor(e.state.rootTypeId),
        recommendedProps: recommendedFor(e.state.rootTypeId),
      });
      const nameField = e.state.entries.name;
      const entityName =
        nameField && nameField.kind === 'text' && nameField.value.trim()
          ? nameField.value.trim()
          : bareName(e.state.rootTypeId);
      return {
        entityName,
        errors: result.filter((i) => i.severity === 'error').length,
        warnings: result.filter((i) => i.severity === 'warning').length,
      };
    });
  }, [bundle]);

  const totalErrors = issues.reduce((sum, i) => sum + i.errors, 0);
  const totalWarnings = issues.reduce((sum, i) => sum + i.warnings, 0);

  async function onExport() {
    if (!bundle) return;
    setBusy(true);
    try {
      const blob = await buildBundleZip(bundle, { agencyCredit });
      const filename = `${bundle.slug || 'untitled'}-schema-bundle.zip`;
      downloadBlob(blob, filename);
      setLastFile(filename);
    } finally {
      setBusy(false);
    }
  }

  if (ws.loading) return <p className="px-6 py-12 text-sm text-zinc-600">Loading…</p>;
  if (!bundle) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12 text-sm">
        <p>No bundle selected. <Link to="/workspace" className="underline">Open Workspace</Link>.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1240px] px-6 py-12 md:py-16">
      <header className="mb-12">
        <p className="text-sm font-medium text-[var(--color-accent)]">Export</p>
        <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          Download a deploy-ready ZIP
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          For bundle <strong>{bundle.name}</strong>. Contains combined JSON-LD, per-entity files,
          an inline-snippet HTML, canonical references, validation report, and a README with
          placement guidance.
        </p>
      </header>

      <div className="mb-8 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
        <h3 className="mb-4 text-xs font-medium text-zinc-500">Export settings</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label className="text-xs">Production URL prefix</Label>
            <Input
              type="url"
              placeholder="https://example.com/drugs"
              value={bundle.idBaseUrl ?? ''}
              onChange={(e) => void updateBundle(bundle.id, { idBaseUrl: e.target.value || undefined })}
            />
            <p className="mt-1 text-[11px] text-zinc-500">
              Without this, exported \`@id\`s use the \`urn:schema-tool:\` scheme.
            </p>
          </div>
          <div>
            <Label className="text-xs">Agency / authorship credit</Label>
            <Input
              type="text"
              placeholder="Acme Health Marketing"
              value={agencyCredit}
              onChange={(e) => setAgencyCredit(e.target.value)}
            />
            <p className="mt-1 text-[11px] text-zinc-500">
              Optional; lands as a footer line in the exported README.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-medium text-zinc-500">Validation</h3>
          {totalErrors === 0 && totalWarnings === 0 ? (
            <Badge variant="outline" className="text-[10px]">
              <CheckCircle2 className="mr-1 inline h-3 w-3" /> OK
            </Badge>
          ) : (
            <div className="flex gap-2">
              {totalErrors > 0 && (
                <Badge variant="destructive" className="text-[10px]">
                  <AlertTriangle className="mr-1 inline h-3 w-3" /> {totalErrors} error
                  {totalErrors === 1 ? '' : 's'}
                </Badge>
              )}
              {totalWarnings > 0 && (
                <Badge variant="warning" className="text-[10px]">
                  {totalWarnings} warning{totalWarnings === 1 ? '' : 's'}
                </Badge>
              )}
            </div>
          )}
        </div>
        {issues.length === 0 ? (
          <p className="text-sm text-zinc-500">No entities in this bundle.</p>
        ) : (
          <ul className="space-y-1 text-sm">
            {issues.map((i, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <span className="truncate">{i.entityName}</span>
                <span className="font-mono text-[11px] text-zinc-500">
                  {i.errors} err · {i.warnings} warn
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={onExport} disabled={busy || bundle.entities.length === 0} variant="pill" size="default">
          <FileDown className="mr-1.5 h-3.5 w-3.5" />
          {busy ? 'Building ZIP…' : `Download ${bundle.slug || 'bundle'}-schema-bundle.zip`}
        </Button>
        {lastFile && (
          <span className="text-xs text-zinc-500">
            Last exported: <code>{lastFile}</code>
          </span>
        )}
      </div>

      <p className="mt-4 max-w-2xl text-xs text-zinc-500 dark:text-zinc-400">
        Run the result through Google's Rich Results Test (
        <a
          className="underline"
          href="https://search.google.com/test/rich-results"
          target="_blank"
          rel="noreferrer noopener"
        >
          search.google.com/test/rich-results
        </a>
        ) and the schema.org validator (
        <a
          className="underline"
          href="https://validator.schema.org/"
          target="_blank"
          rel="noreferrer noopener"
        >
          validator.schema.org
        </a>
        ) before publishing — they sometimes disagree.
      </p>
    </div>
  );
}

// keep useEffect imported even if not directly used (hydrate triggers via useHydrate).
void useEffect;
