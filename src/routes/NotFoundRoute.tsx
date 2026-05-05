import { Link } from 'react-router-dom';

export function NotFoundRoute() {
  return (
    <div className="mx-auto max-w-2xl px-8 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">404</p>
      <h1 className="mt-2 font-serif text-3xl font-medium">Page not found</h1>
      <p className="mt-3 text-zinc-700 dark:text-zinc-300">
        The route you're looking for doesn't exist in the schema-tool app.
      </p>
      <Link to="/" className="mt-6 inline-block text-sm underline">
        Back to home
      </Link>
    </div>
  );
}
