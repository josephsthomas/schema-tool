import { Link } from 'react-router-dom';
import { CATEGORIES_BY_ID } from '@/data/categories';
import { useDataset } from '@/hooks/useDataset';
import { pathForTerm } from '@/lib/routing';
import { bareName } from '@/lib/utils';

interface CategoryCardProps {
  categoryId: string;
}

export function CategoryCard({ categoryId }: CategoryCardProps) {
  const dataset = useDataset();
  const category = CATEGORIES_BY_ID.get(categoryId);
  if (!category) return null;

  const termIds = dataset.categoryAssignments[categoryId] ?? [];
  const previewIds = termIds.slice(0, 8);
  const remaining = termIds.length - previewIds.length;

  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-xl font-semibold tracking-tight">{category.label}</h3>
        <span className="text-sm text-zinc-500">{termIds.length} types</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {category.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {previewIds.map((id) => {
          const term = dataset.termsById[id];
          if (!term || (term.kind !== 'Type' && term.kind !== 'Enumeration')) return null;
          return (
            <li key={id}>
              <Link
                to={pathForTerm(term.id, term.kind)}
                className="inline-block rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-800 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                {bareName(term.id)}
              </Link>
            </li>
          );
        })}
        {remaining > 0 && (
          <li className="px-2 py-1 text-xs text-zinc-500">+{remaining} more</li>
        )}
      </ul>
    </article>
  );
}
