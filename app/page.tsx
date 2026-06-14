'use client';

import { useState } from 'react';

export default function Home() {
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
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600"></div>
              <h1 className="text-xl font-bold text-foreground">CS50 Study Tracker</h1>
            </div>
            <div className="flex gap-6 sm:gap-8">
              <a href="#dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Dashboard
              </a>
              <a href="#history" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                History
              </a>
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
