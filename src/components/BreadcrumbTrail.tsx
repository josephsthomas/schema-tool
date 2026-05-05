import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDataset } from '@/hooks/useDataset';
import { bareName, pathForTerm } from '@/lib/routing';
import { cn } from '@/lib/utils';
import type { SchemaType } from '@/types/schema-org';

interface BreadcrumbTrailProps {
  term: SchemaType;
  className?: string;
}

export function BreadcrumbTrail({ term, className }: BreadcrumbTrailProps) {
  const dataset = useDataset();
  const trail = [...term.ancestors, term.id];

  return (
    <nav aria-label="Inheritance" className={cn('flex flex-wrap items-center gap-1 text-sm', className)}>
      {trail.map((id, idx) => {
        const ancestor = dataset.termsById[id];
        const isLast = idx === trail.length - 1;
        const label = ancestor?.name ?? bareName(id);
        const linkable = ancestor && (ancestor.kind === 'Type' || ancestor.kind === 'Enumeration');
        return (
          <span key={id} className="flex items-center gap-1">
            {linkable && !isLast ? (
              <Link
                to={pathForTerm(ancestor.id, ancestor.kind)}
                className="text-zinc-600 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
                title={ancestor.iri}
              >
                {label}
              </Link>
            ) : (
              <span className={isLast ? 'font-medium text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400'}>
                {label}
              </span>
            )}
            {!isLast && <ChevronRight className="h-3 w-3 text-zinc-400" />}
          </span>
        );
      })}
    </nav>
  );
}
