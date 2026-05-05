import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './routes/RootLayout';
import { HomeRoute } from './routes/HomeRoute';
import { BrowseRoute } from './routes/BrowseRoute';
import { TypeDetailRoute } from './routes/TypeDetailRoute';
import { PropertyDetailRoute } from './routes/PropertyDetailRoute';
import { EnumerationMemberDetailRoute } from './routes/EnumerationMemberDetailRoute';
import { NotFoundRoute } from './routes/NotFoundRoute';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const GeneratorRoute = lazy(() => import('./routes/GeneratorRoute').then((m) => ({ default: m.GeneratorRoute })));
const WorkspaceRoute = lazy(() => import('./routes/WorkspaceRoute').then((m) => ({ default: m.WorkspaceRoute })));
const ExportRoute = lazy(() => import('./routes/ExportRoute').then((m) => ({ default: m.ExportRoute })));

function LazyShell({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <p className="px-6 py-12 text-sm text-zinc-500" aria-busy="true">
            Loading…
          </p>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <HomeRoute /> },
        { path: 'browse', element: <BrowseRoute /> },
        { path: 'Type/:id', element: <TypeDetailRoute /> },
        { path: 'Enumeration/:id', element: <TypeDetailRoute /> },
        { path: 'Enumeration/:id/:memberId', element: <EnumerationMemberDetailRoute /> },
        { path: 'Property/:id', element: <PropertyDetailRoute /> },
        {
          path: 'generator',
          element: (
            <LazyShell>
              <GeneratorRoute />
            </LazyShell>
          ),
        },
        {
          path: 'workspace',
          element: (
            <LazyShell>
              <WorkspaceRoute />
            </LazyShell>
          ),
        },
        {
          path: 'export',
          element: (
            <LazyShell>
              <ExportRoute />
            </LazyShell>
          ),
        },
        { path: '*', element: <NotFoundRoute /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, '') || undefined },
);

export function Router() {
  return <RouterProvider router={router} />;
}
