'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'glass';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get saved theme or detect system preference
    const savedTheme = localStorage.getItem('cs50-theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    applyTheme(initialTheme);
    setThemeState(initialTheme);
  }, []);

  const setTheme = (newTheme: Theme) => {
    applyTheme(newTheme);
    setThemeState(newTheme);
    localStorage.setItem('cs50-theme', newTheme);
  };

  const applyTheme = (newTheme: Theme) => {
    if (typeof document === 'undefined') return;
    const htmlElement = document.documentElement;
    htmlElement.classList.remove('light', 'dark', 'glass');
    htmlElement.classList.add(newTheme);
    htmlElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
