import { cn } from '@/lib/utils';

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
    <section className={cn(className)}>
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      <div className="mt-4 rounded-lg border border-dashed border-zinc-300 bg-zinc-50/50 p-5 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
        <p className="text-xs font-medium text-zinc-500">Authored content pending</p>
        <p className="mt-1.5">{hint}</p>
      </div>
    </section>
  );
}
