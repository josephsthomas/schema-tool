/** Used for Generator/Workspace/Export routes until those phases land. */
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
    <div className="mx-auto max-w-2xl px-8 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">{phase}</p>
      <h1 className="mt-1 font-serif text-4xl font-medium leading-tight tracking-tight">
        {title}
      </h1>
      <p className="mt-4 text-zinc-700 dark:text-zinc-300">{description}</p>
    </div>
  );
}
