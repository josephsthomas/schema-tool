import { Link } from 'react-router-dom';
import { CategoryCard } from '@/components/CategoryCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CATEGORIES } from '@/data/categories';
import { useDataset } from '@/hooks/useDataset';
import { bareName, pathForTerm } from '@/lib/routing';

export function BrowseRoute() {
  const dataset = useDataset();

  return (
    <div className="mx-auto max-w-6xl px-8 py-12">
      <header className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">browse</p>
        <h1 className="mt-1 font-serif text-4xl font-medium leading-tight tracking-tight">
          Vocabulary by category
        </h1>
        <p className="mt-3 max-w-2xl text-base text-zinc-700 dark:text-zinc-300">
          Twelve clinical and functional groupings of the schema.org health-lifesci
          types and the health-relevant core types named in the build brief.
        </p>
      </header>

      <section aria-labelledby="categories" className="mb-16">
        <h2 id="categories" className="sr-only">
          Categories
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} categoryId={category.id} />
          ))}
        </div>
      </section>

      <section aria-labelledby="other-kinds" className="mb-12">
        <h2 id="other-kinds" className="font-serif text-2xl font-medium tracking-tight">
          Properties &amp; enumerations
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Properties live on Type detail pages. Enumerations have their own pages,
          since their members are values you'd select in a dropdown.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-baseline justify-between gap-2">
                <CardTitle className="font-serif text-xl font-medium">Enumerations</CardTitle>
                <span className="font-mono text-xs text-zinc-500">
                  {dataset.byKind.Enumeration.length}
                </span>
              </div>
              <CardDescription>
                Closed sets of values used in dropdowns: medical specialties, drug
                cost categories, study designs, etc.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="flex flex-wrap gap-1.5">
                {dataset.byKind.Enumeration.map((id) => {
                  const term = dataset.termsById[id];
                  if (!term || term.kind !== 'Enumeration') return null;
                  return (
                    <li key={id}>
                      <Link
                        to={pathForTerm(term.id, term.kind)}
                        className="inline-block rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-xs text-zinc-800 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
                      >
                        {bareName(term.id)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-baseline justify-between gap-2">
                <CardTitle className="font-serif text-xl font-medium">Properties</CardTitle>
                <span className="font-mono text-xs text-zinc-500">
                  {dataset.byKind.Property.length}
                </span>
              </div>
              <CardDescription>
                The 163 health-lifesci properties. Each has a detail page; inherited
                core properties (name, url, etc.) link to schema.org.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Best browsed via the Type detail pages, where every property's
                applicability is shown in context. Use ⌘K search to find a specific
                property by name.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
