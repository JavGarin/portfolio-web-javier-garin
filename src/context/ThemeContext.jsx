import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(undefined);

const STORAGE_KEY = 'theme';

// Get system preference
const getSystemTheme = () => {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply theme to document via data-theme attribute (compatible with existing CSS vars)
const applyTheme = (theme) => {
  const root = document.documentElement;
  const resolved = theme === 'system' ? getSystemTheme() : theme;
  root.setAttribute('data-theme', resolved);
  return resolved;
};

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('system');
  const [resolvedTheme, setResolvedTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    const resolved = applyTheme(newTheme);
    setResolvedTheme(resolved);
  };

  // Initialize on mount — reads localStorage or falls back to system preference
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const initialTheme = stored || 'system';
    setThemeState(initialTheme);
    const resolved = applyTheme(initialTheme);
    setResolvedTheme(resolved);
    setMounted(true);
  }, []);

  // Listen for OS-level preference changes (only applies when theme === 'system')
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        const resolved = applyTheme('system');
        setResolvedTheme(resolved);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Render children immediately — flash is prevented by the inline script in index.html
  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
