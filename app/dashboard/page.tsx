'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';

export default function Dashboard() {
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
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="mb-12">
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
        <section>
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
      </main>
    </div>
  );
}
