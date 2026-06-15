'use client';

import { useTheme } from './theme-provider';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 bg-muted/30 rounded-lg p-1 backdrop-blur-sm border border-border/40">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-md transition-all duration-200 ${
          theme === 'light'
            ? 'bg-background text-yellow-500 shadow-md'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="Light mode"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-md transition-all duration-200 ${
          theme === 'dark'
            ? 'bg-background text-blue-400 shadow-md'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="Dark mode"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>
      <button
        onClick={() => setTheme('glass')}
        className={`p-2 rounded-md transition-all duration-200 ${
          theme === 'glass'
            ? 'bg-background text-purple-400 shadow-md'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="Glass mode"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9.59 4.59A2 2 0 1 1 11.41 6.41 2 2 0 0 1 9.59 4.59M12.5 12.5V19M7.5 19h9M15.5 6.5a2 2 0 1 0 2.83 2.83M8.17 8.17a2 2 0 1 0 2.83 2.83"></path>
        </svg>
      </button>
    </div>
  );
}
