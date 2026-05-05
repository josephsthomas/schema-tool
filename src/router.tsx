import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './routes/RootLayout';
import { HomeRoute } from './routes/HomeRoute';
import { BrowseRoute } from './routes/BrowseRoute';
import { TypeDetailRoute } from './routes/TypeDetailRoute';
import { PropertyDetailRoute } from './routes/PropertyDetailRoute';
import { EnumerationMemberDetailRoute } from './routes/EnumerationMemberDetailRoute';
import { NotFoundRoute } from './routes/NotFoundRoute';
import { PlaceholderRoute } from './routes/PlaceholderRoute';
import { GeneratorRoute } from './routes/GeneratorRoute';
import { WorkspaceRoute } from './routes/WorkspaceRoute';
import { ExportRoute } from './routes/ExportRoute';

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
        { path: 'generator', element: <GeneratorRoute /> },
        { path: 'workspace', element: <WorkspaceRoute /> },
        { path: 'export', element: <ExportRoute /> },
        {
          path: '_review',
          element: (
            <PlaceholderRoute
              title="Review (dev)"
              phase="Phase 4"
              description="Verification gate UI. Reviews draft reference examples one at a time and promotes them to verified. Coming in Phase 4."
            />
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
