import { cn } from '@/lib/utils';

/**
 * Renders an authored prose block if present, else a placeholder hint.
 * Body is plain text (newlines preserved as paragraph breaks). Phase 7 may
 * upgrade to react-markdown if richer formatting becomes useful.
 */
export function ProseSection({
  title,
  body,
  placeholderHint,
  className,
}: {
  title: string;
  body?: string;
  placeholderHint: string;
  className?: string;
}) {
  return (
    <section className={cn('mt-10', className)}>
      <h2 className="font-serif text-2xl font-medium tracking-tight">{title}</h2>
      {body ? (
        <div className="mt-3 max-w-3xl space-y-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          {body
            .split(/\n{2,}/)
            .map((paragraph, idx) => (
              <p key={idx}>{paragraph.trim()}</p>
            ))}
        </div>
      ) : (
        <div className="mt-3 rounded-md border border-dashed border-zinc-300 bg-zinc-50/50 p-5 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
          <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            authored content — Phase 3
          </p>
          <p className="mt-1">{placeholderHint}</p>
        </div>
      )}
    </section>
  );
}
