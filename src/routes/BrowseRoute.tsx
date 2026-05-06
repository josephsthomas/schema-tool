import { Link } from 'react-router-dom';
import { CategoryCard } from '@/components/CategoryCard';
import { CATEGORIES } from '@/data/categories';
import { useDataset } from '@/hooks/useDataset';
import { bareName, pathForTerm } from '@/lib/routing';

export function BrowseRoute() {
  const dataset = useDataset();

  return (
    <div className="py-10 md:py-14">
      <header className="border-b border-zinc-100 pb-8 dark:border-zinc-900">
        <p className="text-sm font-medium text-[var(--color-accent)]">Browse</p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          Vocabulary by category
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          Twelve clinical and functional groupings of the schema.org health-lifesci types and the
          health-relevant core types named in the build brief.
        </p>
      </header>

      <section className="mt-10">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} categoryId={category.id} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
          Properties and enumerations
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Properties live on Type detail pages. Enumerations have their own pages, since their
          members are values you'd select in a dropdown.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold tracking-tight">Enumerations</h3>
              <span className="text-sm text-zinc-500">{dataset.byKind.Enumeration.length}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Closed sets of values used in dropdowns — medical specialties, drug cost categories,
              study designs, and similar.
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {dataset.byKind.Enumeration.map((id) => {
                const term = dataset.termsById[id];
                if (!term || term.kind !== 'Enumeration') return null;
                return (
                  <li key={id}>
                    <Link
                      to={pathForTerm(term.id, term.kind)}
                      className="inline-block rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-800 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
                    >
                      {bareName(term.id)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold tracking-tight">Properties</h3>
              <span className="text-sm text-zinc-500">{dataset.byKind.Property.length}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              The 163 health-lifesci properties. Each has a detail page; inherited core properties
              like name and url link to schema.org.
            </p>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              Best browsed via the Type detail pages, where every property's applicability is
              shown in context. Press ⌘K to search by property name.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
