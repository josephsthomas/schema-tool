import { useEffect, useState } from 'react';
import type { SchemaDataset } from './types/schema-org';

export function App() {
  const [dataset, setDataset] = useState<SchemaDataset | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    import('./data/schema.generated')
      .then((mod) => setDataset(mod.dataset))
      .catch((e: unknown) => {
        setError(
          e instanceof Error
            ? e.message
            : 'Run `pnpm ingest` to generate src/data/schema.generated.ts',
        );
      });
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-8 py-16">
      <header className="mb-12">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
          schema-tool · phase 1 · data foundation
        </p>
        <h1 className="mt-2 font-serif text-5xl font-medium leading-tight tracking-tight">
          Medical &amp; Health-Sciences Schema Tool
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-700">
          A reference, generator, and export tool for the schema.org health-lifesci
          vocabulary plus the health-relevant core types listed in the brief.
        </p>
      </header>

      <section aria-labelledby="dataset-heading">
        <h2 id="dataset-heading" className="font-serif text-2xl font-medium">
          Dataset
        </h2>
        {error && (
          <div className="mt-4 rounded border border-amber-300 bg-amber-50 p-4 font-mono text-sm text-amber-900">
            {error}
          </div>
        )}
        {dataset && <DatasetSummary dataset={dataset} />}
      </section>
    </main>
  );
}

function DatasetSummary({ dataset }: { dataset: SchemaDataset }) {
  const counts: ReadonlyArray<readonly [string, number]> = [
    ['Types', dataset.byKind.Type.length],
    ['Properties', dataset.byKind.Property.length],
    ['Enumerations', dataset.byKind.Enumeration.length],
    ['Enumeration members', dataset.byKind.EnumerationMember.length],
  ];
  const total = counts.reduce((sum, [, n]) => sum + n, 0);

  return (
    <div className="mt-6">
      <p className="text-sm text-zinc-600">
        Schema.org version <span className="font-mono">{dataset.version}</span> · generated{' '}
        <span className="font-mono">{dataset.generatedAt.slice(0, 10)}</span> ·{' '}
        <span className="font-mono">{total}</span> terms
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {counts.map(([label, count]) => (
          <div key={label} className="rounded-lg border border-zinc-200 p-4">
            <dt className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              {label}
            </dt>
            <dd className="mt-1 font-serif text-3xl font-medium text-zinc-900">
              {count}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
