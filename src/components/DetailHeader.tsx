import { ExternalLink } from 'lucide-react';
import { CopyButton } from '@/components/CopyButton';
import { LayerBadges } from '@/components/Layer';
import { CATEGORIES_BY_ID } from '@/data/categories';
import { Badge } from '@/components/ui/badge';
import type { SchemaTerm } from '@/types/schema-org';

interface DetailHeaderProps {
  term: SchemaTerm;
  kindLabel: string;
}

export function DetailHeader({ term, kindLabel }: DetailHeaderProps) {
  const categoryLabels =
    (term.kind === 'Type' || term.kind === 'Enumeration')
      ? term.categoryIds
          .map((cid) => CATEGORIES_BY_ID.get(cid)?.label)
          .filter((l): l is string => Boolean(l))
      : [];

  return (
    <header className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
      <p className="text-sm font-medium text-[var(--color-accent)]">{kindLabel}</p>
      <h1 className="mt-2 text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
        {term.name}
      </h1>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <a
          href={term.iri}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 font-mono text-xs text-zinc-700 hover:underline dark:text-zinc-300"
        >
          {term.iri}
          <ExternalLink className="h-3 w-3 opacity-60" />
        </a>
        <CopyButton value={term.iri} label="Copy URL" />
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-1.5">
        <LayerBadges term={term} />
        {categoryLabels.map((label) => (
          <Badge key={label} variant="outline">
            {label}
          </Badge>
        ))}
      </div>
      {term.description && (
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          {term.description}
        </p>
      )}
    </header>
  );
}
