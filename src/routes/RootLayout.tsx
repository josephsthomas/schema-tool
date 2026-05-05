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
      <div className="flex min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        {/* Persistent left rail */}
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-zinc-200 bg-white px-4 py-6 md:flex dark:border-zinc-800 dark:bg-zinc-950">
          <Link to="/" className="mb-8 block">
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              schema-tool
            </p>
            <p className="mt-1 font-serif text-lg font-medium leading-tight">
              Medical &amp; Health-Sci
            </p>
          </Link>

          <Button
            variant="outline"
            className="mb-6 justify-between font-normal"
            onClick={() => setSearchOpen(true)}
          >
            <span className="inline-flex items-center gap-2 text-sm">
              <Search className="h-4 w-4" />
              Search…
            </span>
            <kbd className="ml-2 hidden rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 text-[10px] font-mono text-zinc-600 sm:inline dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              ⌘K
            </kbd>
          </Button>

          <nav className="flex flex-col gap-0.5 text-sm">
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
            <Separator className="my-3" />
            <RailLink to="/_review" icon={<BookOpen className="h-4 w-4" />}>
              Review (dev)
            </RailLink>
          </nav>

          <div className="mt-auto pt-6">
            <Separator className="mb-3" />
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] text-zinc-500">
                schema.org v{dataset.version}
              </p>
              <ThemeToggle />
            </div>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Mobile top bar */}
          <header className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 md:hidden dark:border-zinc-800">
            <Link to="/" className="font-serif text-base font-medium">
              schema-tool
            </Link>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} aria-label="Search">
                <Search className="h-4 w-4" />
              </Button>
              <ThemeToggle />
            </div>
          </header>

          <main className="flex-1">
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
