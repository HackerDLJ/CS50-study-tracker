'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useSupabaseAuth } from '@/components/supabase-auth-provider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function LoginPage() {
  const { user, loading, loginWithGithub } = useSupabaseAuth();
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isEmailLogin, setIsEmailLogin] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleGitHubLogin = async () => {
    setIsLoggingIn(true);
    await loginWithGithub();
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setIsLoggingIn(false);
      }
    } catch (err: any) {
      setError('An unexpected error occurred');
      setIsLoggingIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

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
            <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to CS50</h2>
            <p className="text-muted-foreground mb-8">Track your study progress and master computer science</p>

            {!isEmailLogin ? (
              <>
                <button
                  onClick={handleGitHubLogin}
                  disabled={isLoggingIn}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-foreground text-background font-semibold hover:bg-foreground/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
                  GitHub Login
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-card text-muted-foreground">Or</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsEmailLogin(true)}
                  className="w-full px-6 py-3 rounded-lg border border-border bg-background hover:bg-muted/50 font-semibold transition-all"
                >
                  Sign in with Email
                </button>

                <p className="text-center text-muted-foreground text-sm mt-6">
                  Don&apos;t have an account?{' '}
                  <Link href="/auth/signup" className="text-primary hover:underline font-semibold">
                    Sign up
                  </Link>
                </p>
              </>
            ) : (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full px-6 py-3 rounded-lg bg-foreground text-background font-semibold hover:bg-foreground/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingIn ? 'Signing in...' : 'Sign In'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsEmailLogin(false);
                    setError('');
                  }}
                  className="w-full text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Back to GitHub
                </button>

                <p className="text-center text-muted-foreground text-sm">
                  Don&apos;t have an account?{' '}
                  <Link href="/auth/signup" className="text-primary hover:underline font-semibold">
                    Sign up
                  </Link>
                </p>
              </form>
            )}

            <div className="mt-8 pt-8 border-t border-border/40">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Join hundreds of CS50 students tracking their progress
              </p>
              <div className="grid grid-cols-3 gap-4 text-center text-xs">
                <div>
                  <p className="font-semibold text-foreground">Track</p>
                  <p className="text-muted-foreground">Study time</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Analyze</p>
                  <p className="text-muted-foreground">Progress</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Achieve</p>
                  <p className="text-muted-foreground">Goals</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            By signing in, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
}
