import { ChevronDown, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { SearchPalette } from '@/components/SearchPalette';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
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
        <TopNav onSearchOpen={() => setSearchOpen(true)} />
        <main id="main-content" className="flex-1">
          <Outlet />
        </main>
        <Footer version={dataset.version} />
        <SearchPalette open={searchOpen} onOpenChange={setSearchOpen} />
      </div>
    </TooltipProvider>
  );
}

function TopNav({ onSearchOpen }: { onSearchOpen: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/85 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/85">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="font-semibold tracking-tight">schema-tool</span>
          <span className="hidden text-xs text-zinc-500 sm:inline">Medical & Health-Sci</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <NavDropdown
            label="Reference"
            items={[
              { to: '/browse', label: 'Browse all 399 terms' },
              { to: '/Type/Drug', label: 'Drug' },
              { to: '/Type/MedicalCondition', label: 'MedicalCondition' },
              { to: '/Type/Hospital', label: 'Hospital' },
            ]}
          />
          <NavDropdown
            label="Tools"
            items={[
              { to: '/generator', label: 'Generator' },
              { to: '/workspace', label: 'Workspace' },
              { to: '/export', label: 'Export ZIP' },
            ]}
          />
          <NavLink
            to="/browse"
            className={({ isActive }) =>
              cn(
                'rounded-full px-3 py-1.5 text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100',
                isActive && 'bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100',
              )
            }
          >
            Browse
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onSearchOpen} aria-label="Open search (⌘K)">
            <Search className="h-4 w-4" />
          </Button>
          <ThemeToggle />
          <a
            href="mailto:joseph@jsthomas.org?subject=schema-tool"
            className="hidden md:inline-flex"
          >
            <Button variant="pill" size="default">
              Let's talk
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: { to: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          'inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100',
          open && 'bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100',
        )}
      >
        {label}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-40 mt-2 w-60 rounded-lg border border-zinc-200 bg-white p-1.5 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Footer({ version }: { version: string }) {
  return (
    <footer className="mt-32 border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-tight">schema-tool</p>
            <p className="mt-1 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
              Reference, JSON-LD generator, and ZIP export for the schema.org health-lifesci
              vocabulary — built for content strategists and developers shipping medical markup.
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            <span>schema.org v{version}</span>
            <a
              href="https://github.com/josephsthomas/schema-tool"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              GitHub
            </a>
            <a
              href="mailto:joseph@jsthomas.org?subject=schema-tool"
              className="hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
