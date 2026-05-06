export function PlaceholderRoute({
  title,
  phase,
  description,
}: {
  title: string;
  phase: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-32">
      <p className="text-sm font-medium text-[var(--color-accent)]">{phase}</p>
      <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
        {title}
      </h1>
      <p className="mt-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
        {description}
      </p>
    </div>
  );
}
