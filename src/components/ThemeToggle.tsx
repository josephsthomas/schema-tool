import { Monitor, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme, type Theme } from '@/hooks/useTheme';

const ORDER: Theme[] = ['system', 'light', 'dark'];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  function cycle() {
    const idx = ORDER.indexOf(theme);
    const next = ORDER[(idx + 1) % ORDER.length] ?? 'system';
    setTheme(next);
  }

  const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor;
  const label = theme === 'dark' ? 'Dark' : theme === 'light' ? 'Light' : 'System';

  return (
    <Button variant="ghost" size="sm" onClick={cycle} aria-label={`Theme: ${label}`} title={`Theme: ${label}`}>
      <Icon className="h-4 w-4" />
    </Button>
  );
}
