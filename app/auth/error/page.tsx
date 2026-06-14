'use client';

import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <img src="/cs50-logo.svg" alt="CS50" className="h-8 w-8 rounded-lg" />
          <h1 className="text-2xl font-bold text-foreground">CS50 Study Tracker</h1>
        </div>
        <ThemeSwitcher />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-xl p-8 border border-border/40 backdrop-blur-sm">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Authentication Error</h2>
              <p className="text-muted-foreground">Something went wrong during the login process</p>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-foreground">
                The GitHub authentication failed. This could be due to:
              </p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4 list-disc">
                <li>Incorrect GitHub credentials</li>
                <li>Account permission issues</li>
                <li>Temporary service unavailability</li>
              </ul>
            </div>

            <Link
              href="/auth/login"
              className="w-full flex items-center justify-center px-6 py-3 rounded-lg bg-foreground text-background font-semibold hover:bg-foreground/90 transition-all"
            >
              Back to Login
            </Link>

            <Link
              href="/"
              className="w-full flex items-center justify-center px-6 py-3 rounded-lg bg-muted text-muted-foreground font-semibold hover:bg-muted/80 transition-all mt-3"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
