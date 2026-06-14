'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { useSupabaseAuth } from '@/components/supabase-auth-provider';

export function Navbar() {
  const pathname = usePathname();
  const { user, loginWithGithub, logout, loading } = useSupabaseAuth();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/cs50-logo.svg" alt="CS50" className="h-8 w-8 rounded-lg" />
            <h1 className="text-xl font-bold text-foreground">CS50 Study Tracker</h1>
          </Link>
          <div className="flex gap-6 items-center">
            <div className="hidden sm:flex gap-8">
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/history"
                className={`text-sm font-medium transition-colors ${
                  isActive('/history')
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                History
              </Link>
              <Link
                href="/analytics"
                className={`text-sm font-medium transition-colors ${
                  isActive('/analytics')
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Analytics
              </Link>
              <Link
                href="/goals"
                className={`text-sm font-medium transition-colors ${
                  isActive('/goals')
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Goals
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <ThemeSwitcher />
              {!loading && user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={user.user_metadata?.avatar_url || 'https://api.github.com/users/octocat/avatar_url'}
                      alt={user.user_metadata?.full_name || 'User'}
                      className="h-8 w-8 rounded-full border border-border"
                    />
                    <span className="text-sm font-medium text-foreground hidden sm:inline">{user.user_metadata?.full_name || user.email}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors flex items-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={loginWithGithub}
                  className="px-4 py-2 rounded-lg bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-colors flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="hidden sm:inline">GitHub Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
