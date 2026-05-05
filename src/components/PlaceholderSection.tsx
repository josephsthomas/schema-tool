import { cn } from '@/lib/utils';

/** Stand-in for the four authored sections that arrive in Phase 3. */
export function PlaceholderSection({
  title,
  hint,
  className,
}: {
  title: string;
  hint: string;
  className?: string;
}) {
  return (
    <section className={cn('mt-10', className)}>
      <h2 className="font-serif text-2xl font-medium tracking-tight">{title}</h2>
      <div className="mt-3 rounded-md border border-dashed border-zinc-300 bg-zinc-50/50 p-5 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
        <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
          authored content — Phase 3
        </p>
        <p className="mt-1">{hint}</p>
      </div>
    </section>
  );
}
