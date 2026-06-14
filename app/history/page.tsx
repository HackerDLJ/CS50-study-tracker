'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';

interface Session {
  date: string;
  subject: string;
  minutes: number;
  notes: string;
}

export default function History() {
  const [sessions] = useState<Session[]>([
    { date: '2025-01-14', subject: 'Algorithms', minutes: 45, notes: 'Reviewed sorting algorithms' },
    { date: '2025-01-13', subject: 'Data Structures', minutes: 60, notes: 'Learned about binary trees' },
    { date: '2025-01-12', subject: 'Web Development', minutes: 90, notes: 'Built responsive layouts with Tailwind' },
    { date: '2025-01-11', subject: 'Python', minutes: 75, notes: 'Mastered list comprehensions' },
    { date: '2025-01-10', subject: 'SQL', minutes: 50, notes: 'Practiced JOIN operations' },
    { date: '2025-01-09', subject: 'JavaScript', minutes: 120, notes: 'Deep dive into async/await' },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-950 to-background">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <section>
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
