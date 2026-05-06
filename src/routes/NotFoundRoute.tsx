import { Link } from 'react-router-dom';

export function NotFoundRoute() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="text-sm font-medium text-zinc-500">404</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 text-zinc-700 dark:text-zinc-300">
        The route you're looking for doesn't exist in the schema-tool app.
      </p>
      <Link to="/" className="mt-6 inline-block text-sm underline">
        Back to home
      </Link>
    </div>
  );
}
