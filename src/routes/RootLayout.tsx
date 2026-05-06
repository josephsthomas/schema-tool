import { BookOpen, Boxes, Download, FileEdit, Library, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { SearchPalette } from '@/components/SearchPalette';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useDataset } from '@/hooks/useDataset';
import { cn } from '@/lib/utils';

export function RootLayout() {
  const dataset = useDataset();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <TooltipProvider>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <div className="flex min-h-screen flex-col bg-[var(--color-surface)] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        {/* Sticky top bar — brand + search + theme toggle */}
        <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/85 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/85">
          <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between gap-6 px-6">
            <Link to="/" className="flex items-center gap-3">
              <span className="font-semibold tracking-tight">Schema Tool</span>
              <span className="hidden text-xs text-zinc-500 sm:inline">Medical &amp; Health-Sci</span>
            </Link>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchOpen(true)}
                className="gap-2 font-normal"
              >
                <Search className="h-3.5 w-3.5" />
                <span>Search</span>
                <kbd className="ml-1 hidden rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 text-[10px] font-mono text-zinc-600 sm:inline dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  ⌘K
                </kbd>
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Main shell — left rail + content */}
        <div className="mx-auto flex w-full max-w-[1240px] flex-1 px-6">
          <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-52 shrink-0 flex-col border-r border-zinc-100 py-8 pr-6 md:flex dark:border-zinc-900">
            <p className="mb-3 text-xs font-medium text-zinc-500">Navigate</p>
            <nav className="flex flex-col gap-0.5 text-sm" aria-label="Primary">
              <RailLink to="/browse" icon={<Library className="h-4 w-4" />}>
                Browse
              </RailLink>
              <RailLink to="/generator" icon={<FileEdit className="h-4 w-4" />}>
                Generator
              </RailLink>
              <RailLink to="/workspace" icon={<Boxes className="h-4 w-4" />}>
                Workspace
              </RailLink>
              <RailLink to="/export" icon={<Download className="h-4 w-4" />}>
                Export
              </RailLink>
            </nav>

            <Separator className="my-4" />
            <p className="mb-3 text-xs font-medium text-zinc-500">Quick types</p>
            <nav className="flex flex-col gap-0.5 text-sm" aria-label="Quick types">
              <QuickLink to="/Type/Drug">Drug</QuickLink>
              <QuickLink to="/Type/MedicalCondition">MedicalCondition</QuickLink>
              <QuickLink to="/Type/Hospital">Hospital</QuickLink>
              <QuickLink to="/Type/Physician">Physician</QuickLink>
              <QuickLink to="/Type/MedicalProcedure">MedicalProcedure</QuickLink>
              <QuickLink to="/Type/MedicalTrial">MedicalTrial</QuickLink>
            </nav>

            <div className="mt-auto pt-6">
              <Separator className="mb-3" />
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <BookOpen className="h-3.5 w-3.5" />
                schema.org v{dataset.version}
              </div>
            </div>
          </aside>

          <main id="main-content" className="min-w-0 flex-1">
            <Outlet />
          </main>
        </div>

        <SearchPalette open={searchOpen} onOpenChange={setSearchOpen} />
      </div>
    </TooltipProvider>
  );
}

function RailLink({
  to,
  icon,
  children,
}: {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      end={false}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-2 rounded-md px-2 py-1.5 text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900',
          isActive && 'bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100',
        )
      }
    >
      {icon}
      <span>{children}</span>
    </NavLink>
  );
}

function QuickLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'rounded-md px-2 py-1 text-[13px] text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100',
          isActive && 'bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100',
        )
      }
    >
      {children}
    </NavLink>
  );
}
