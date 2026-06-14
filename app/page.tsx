'use client';

import { useState } from 'react';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { useAuth } from '@/components/auth-provider';

export default function Home() {
  const { user, loginWithGithub, logout } = useAuth();
  const [sessions, setSessions] = useState([
    { date: '2025-01-14', subject: 'Algorithms', minutes: 45, notes: 'Reviewed sorting algorithms' },
    { date: '2025-01-13', subject: 'Data Structures', minutes: 60, notes: 'Learned about binary trees' },
  ]);
  const [formData, setFormData] = useState({ subject: 'Algorithms', minutes: '', notes: '' });

  const totalMinutes = sessions.reduce((sum, session) => sum + session.minutes, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.minutes || !formData.subject) return;

    const newSession = {
      date: new Date().toISOString().split('T')[0],
      subject: formData.subject,
      minutes: parseInt(formData.minutes),
      notes: formData.notes,
    };

    setSessions([newSession, ...sessions]);
    setFormData({ subject: 'Algorithms', minutes: '', notes: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-950 to-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/cs50-logo.svg" alt="CS50" className="h-8 w-8 rounded-lg" />
              <h1 className="text-xl font-bold text-foreground">CS50 Study Tracker</h1>
            </div>
            <div className="flex gap-6 items-center">
              <div className="hidden sm:flex gap-8">
                <a href="#dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Dashboard
                </a>
                <a href="#history" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  History
                </a>
              </div>
              <div className="flex items-center gap-3">
                <ThemeSwitcher />
                {user ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-8 w-8 rounded-full border border-border"
                      />
                      <span className="text-sm font-medium text-foreground hidden sm:inline">{user.name}</span>
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
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="hidden sm:inline">GitHub Login</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section id="dashboard" className="mb-12">
          <div className="rounded-2xl border border-border/40 bg-gradient-to-br from-card to-card/60 p-8 sm:p-12 shadow-xl">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">Total Study Time</p>
              <h2 className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                {totalMinutes}
              </h2>
              <p className="text-lg text-muted-foreground">minutes tracked</p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="mb-12">
          <div className="rounded-2xl border border-border/40 bg-card p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-foreground mb-6">Log Study Session</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Subject Field */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                >
                  <option>Algorithms</option>
                  <option>Data Structures</option>
                  <option>Web Development</option>
                  <option>Python</option>
                  <option>SQL</option>
                  <option>JavaScript</option>
                </select>
              </div>

              {/* Minutes Field */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Minutes Studied
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="45"
                  value={formData.minutes}
                  onChange={(e) => setFormData({ ...formData, minutes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                />
              </div>

              {/* Notes Field */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  What did you accomplish?
                </label>
                <textarea
                  placeholder="Summarize what you learned..."
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
              >
                Log Session
              </button>
            </form>
          </div>
        </section>

        {/* History Section */}
        <section id="history">
          <div className="rounded-2xl border border-border/40 bg-card p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-foreground mb-6">Study History</h3>
            
            {sessions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No study sessions yet. Start logging to see your history!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40">
                      <th className="text-left py-4 px-4 font-semibold text-foreground text-sm">Date</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground text-sm">Subject</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground text-sm">Minutes</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground text-sm">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((session, idx) => (
                      <tr key={idx} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                        <td className="py-4 px-4 text-sm text-foreground">
                          {new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="py-4 px-4 text-sm">
                          <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 text-xs font-medium">
                            {session.subject}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-foreground font-medium">{session.minutes}</td>
                        <td className="py-4 px-4 text-sm text-muted-foreground max-w-xs truncate">{session.notes || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
