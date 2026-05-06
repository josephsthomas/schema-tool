import { Link, useParams } from 'react-router-dom';
import { DetailHeader } from '@/components/DetailHeader';
import { PlaceholderSection } from '@/components/PlaceholderSection';
import { useDataset } from '@/hooks/useDataset';
import { bareName, pathForTerm, toSchemaId } from '@/lib/routing';

export function PropertyDetailRoute() {
  const { id: rawId } = useParams<{ id: string }>();
  const dataset = useDataset();
  const id = rawId ? toSchemaId(rawId) : undefined;
  const term = id ? dataset.termsById[id] : undefined;

  if (!term || term.kind !== 'Property') {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="text-sm font-medium text-zinc-500">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Property not found</h1>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">
          No property in the dataset for{' '}
          <span className="font-mono">{rawId ?? '(missing id)'}</span>.
        </p>
        <Link to="/browse" className="mt-6 inline-block text-sm underline">
          Back to Browse
        </Link>
      </div>
    );
  }

  const domains = term.domainIncludes
    .map((id) => dataset.termsById[id])
    .filter((t): t is import('@/types/schema-org').SchemaType => t?.kind === 'Type' || t?.kind === 'Enumeration');
  const ranges = term.rangeIncludes.map((id) => ({ id, term: dataset.termsById[id] }));

  return (
    <article className="mx-auto max-w-[1240px] px-6 py-16 md:py-24">
      <DetailHeader term={term} kindLabel="Property" />

      <section className="mt-16 grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-base font-semibold tracking-tight">Used on (domain)</h2>
          <div className="mt-4">
            {domains.length === 0 ? (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                No in-scope domain types — likely inherited from a core type.
              </p>
            ) : (
              <ul className="flex flex-wrap gap-1.5">
                {domains.map((t) => (
                  <li key={t.id}>
                    <Link
                      to={pathForTerm(t.id, t.kind)}
                      className="inline-block rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-800 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
                    >
                      {bareName(t.id)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-base font-semibold tracking-tight">Expected values (range)</h2>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {ranges.map(({ id: rId, term: r }) => {
              const name = bareName(rId);
              if (r && (r.kind === 'Type' || r.kind === 'Enumeration')) {
                return (
                  <li key={rId}>
                    <Link
                      to={pathForTerm(r.id, r.kind)}
                      className="inline-block rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-800 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
                    >
                      {name}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={rId}>
                  <span className="inline-block rounded-md border border-dashed border-zinc-300 px-2 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
                    {name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <div className="mt-16">
        <PlaceholderSection
          title="Example in context"
          hint="A short JSON-LD snippet showing this property in use within its primary parent type's example."
        />
      </div>
    </article>
  );
}
