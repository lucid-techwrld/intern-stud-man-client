import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
const initial = (): Theme => {
  try { const s = localStorage.getItem('theme'); if (s === 'light' || s === 'dark') return s; } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initial);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) };
}
