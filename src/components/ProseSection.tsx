import { cn } from '@/lib/utils';

/**
 * Renders an authored prose block if present, else a placeholder hint.
 * Body is plain text (newlines preserved as paragraph breaks).
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
    <section className={cn(className)}>
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      {body ? (
        <div className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          {body
            .split(/\n{2,}/)
            .map((paragraph, idx) => (
              <p key={idx}>{paragraph.trim()}</p>
            ))}
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-dashed border-zinc-300 bg-zinc-50/50 p-5 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
          <p className="text-xs font-medium text-zinc-500">Authored content pending</p>
          <p className="mt-1.5">{placeholderHint}</p>
        </div>
      )}
    </section>
  );
}
