import { Link, useParams } from 'react-router-dom';
import { DetailHeader } from '@/components/DetailHeader';
import { PlaceholderSection } from '@/components/PlaceholderSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDataset } from '@/hooks/useDataset';
import { bareName, pathForTerm, toSchemaId } from '@/lib/routing';

export function PropertyDetailRoute() {
  const { id: rawId } = useParams<{ id: string }>();
  const dataset = useDataset();
  const id = rawId ? toSchemaId(rawId) : undefined;
  const term = id ? dataset.termsById[id] : undefined;

  if (!term || term.kind !== 'Property') {
    return (
      <div className="mx-auto max-w-2xl px-8 py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">404</p>
        <h1 className="mt-2 font-serif text-3xl font-medium">Property not found</h1>
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
  const ranges = term.rangeIncludes
    .map((id) => ({ id, term: dataset.termsById[id] }));

  return (
    <article className="mx-auto max-w-4xl px-8 py-12">
      <DetailHeader term={term} kindLabel="Property" />

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Used on (domain)</CardTitle>
          </CardHeader>
          <CardContent>
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
                      className="inline-block rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-xs text-zinc-800 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
                    >
                      {bareName(t.id)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Expected values (range)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-wrap gap-1.5">
              {ranges.map(({ id: rId, term: r }) => {
                const name = bareName(rId);
                if (r && (r.kind === 'Type' || r.kind === 'Enumeration')) {
                  return (
                    <li key={rId}>
                      <Link
                        to={pathForTerm(r.id, r.kind)}
                        className="inline-block rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-xs text-zinc-800 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
                      >
                        {name}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={rId}>
                    <span className="inline-block rounded-md border border-dashed border-zinc-300 px-2 py-0.5 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
                      {name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </section>

      <PlaceholderSection
        title="Example in context"
        hint="A short JSON-LD snippet showing this property in use within its primary parent type's example. Phase 3 generates from the parent's reference example."
      />
    </article>
  );
}
