import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './routes/RootLayout';
import { HomeRoute } from './routes/HomeRoute';
import { BrowseRoute } from './routes/BrowseRoute';
import { TypeDetailRoute } from './routes/TypeDetailRoute';
import { PropertyDetailRoute } from './routes/PropertyDetailRoute';
import { EnumerationMemberDetailRoute } from './routes/EnumerationMemberDetailRoute';
import { NotFoundRoute } from './routes/NotFoundRoute';
import { PlaceholderRoute } from './routes/PlaceholderRoute';

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
            <PlaceholderRoute
              title="Generator"
              phase="Phase 5"
              description="Form-driven JSON-LD generation. Pick a Type, fill required and recommended fields, get valid output. Coming in Phase 5."
            />
          ),
        },
        {
          path: 'workspace',
          element: (
            <PlaceholderRoute
              title="Workspace"
              phase="Phase 6"
              description="Compose multiple entities into a page bundle. Cross-entity @id refs, drag-to-reorder, pre-built combo templates. Coming in Phase 6."
            />
          ),
        },
        {
          path: 'export',
          element: (
            <PlaceholderRoute
              title="Export"
              phase="Phase 6"
              description="Download a ZIP with combined JSON-LD, per-entity files, an inline-snippet HTML, canonical references, and a validation report. Coming in Phase 6."
            />
          ),
        },
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
