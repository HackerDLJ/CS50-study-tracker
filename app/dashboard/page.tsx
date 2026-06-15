'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseAuth } from '@/components/supabase-auth-provider';
import { Navbar } from '@/components/navbar';
import { addStudySession, getStudySessions, getTotalStudyMinutes, getStudyStreak, getStudyGoals } from '@/lib/supabase/queries';

export default function Dashboard() {
  const { user, loading } = useSupabaseAuth();
  const router = useRouter();
  const [sessions, setSessions] = useState<any[]>([]);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ subject: 'Algorithms', minutes: '', notes: '' });
  const [streak, setStreak] = useState({ current_streak: 0, longest_streak: 0 });
  const [goals, setGoals] = useState<any[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;
    try {
      const [sessionsRes, minutesRes, streakRes, goalsRes] = await Promise.all([
        getStudySessions(user.id),
        getTotalStudyMinutes(user.id),
        getStudyStreak(user.id),
        getStudyGoals(user.id),
      ]);

      if (sessionsRes.data) setSessions(sessionsRes.data);
      if (minutesRes.total !== undefined) setTotalMinutes(minutesRes.total);
      if (streakRes.data) setStreak(streakRes.data);
      if (goalsRes.data) setGoals(goalsRes.data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.minutes || !formData.subject || !user) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await addStudySession(
        user.id,
        formData.subject,
        parseInt(formData.minutes),
        formData.notes
      );

      if (!error && data) {
        setSessions([data[0], ...sessions]);
        setTotalMinutes(totalMinutes + parseInt(formData.minutes));
        setFormData({ subject: 'Algorithms', minutes: '', notes: '' });
      }
    } catch (error) {
      console.error('Error adding session:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || pageLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-slate-950 to-background">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-950 to-background">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Minutes */}
          <div className="rounded-2xl border border-border/40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 shadow-xl">
            <p className="text-sm font-medium text-muted-foreground mb-2">Total Study Time</p>
            <h3 className="text-4xl font-bold text-blue-400 mb-2">{totalMinutes}</h3>
            <p className="text-sm text-muted-foreground">minutes tracked</p>
          </div>

          {/* Current Streak */}
          <div className="rounded-2xl border border-border/40 bg-gradient-to-br from-orange-500/10 to-red-500/10 p-8 shadow-xl">
            <p className="text-sm font-medium text-muted-foreground mb-2">Current Streak</p>
            <h3 className="text-4xl font-bold text-orange-400 mb-2">{streak.current_streak}</h3>
            <p className="text-sm text-muted-foreground">days in a row</p>
          </div>

          {/* Longest Streak */}
          <div className="rounded-2xl border border-border/40 bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-8 shadow-xl">
            <p className="text-sm font-medium text-muted-foreground mb-2">Longest Streak</p>
            <h3 className="text-4xl font-bold text-green-400 mb-2">{streak.longest_streak}</h3>
            <p className="text-sm text-muted-foreground">personal best</p>
          </div>
        </section>

        {/* Form Section */}
        <section className="mb-12">
          <div className="rounded-2xl border border-border/40 bg-card p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-foreground mb-6">Log Study Session</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option>Algorithms</option>
                    <option>Data Structures</option>
                    <option>Web Development</option>
                    <option>Python</option>
                    <option>SQL</option>
                    <option>JavaScript</option>
                    <option>C</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Minutes</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.minutes}
                    onChange={(e) => setFormData({ ...formData, minutes: e.target.value })}
                    placeholder="45"
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">What did you accomplish?</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Reviewed sorting algorithms, solved practice problems..."
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none h-24"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Logging...' : 'Log Session'}
              </button>
            </form>
          </div>
        </section>

        {/* Active Goals */}
        {goals.length > 0 && (
          <section className="mb-12">
            <div className="rounded-2xl border border-border/40 bg-card p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-foreground mb-6">Study Goals</h3>
              <div className="space-y-4">
                {goals.map((goal) => (
                  <div key={goal.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/20">
                    <div>
                      <p className="font-semibold text-foreground">{goal.goal_name}</p>
                      <p className="text-sm text-muted-foreground">Target: {goal.target_minutes} minutes ({goal.goal_type})</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${goal.is_completed ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      {goal.is_completed ? 'Completed' : 'In Progress'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recent Sessions */}
        {sessions.length > 0 && (
          <section>
            <div className="rounded-2xl border border-border/40 bg-card p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-foreground mb-6">Recent Sessions</h3>
              <div className="space-y-4">
                {sessions.slice(0, 5).map((session) => (
                  <div key={session.id} className="flex items-start justify-between p-4 bg-background/50 rounded-lg border border-border/20 hover:border-border/40 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">{session.subject}</span>
                        <span className="text-sm text-muted-foreground">{session.date}</span>
                      </div>
                      {session.notes && <p className="text-sm text-foreground">{session.notes}</p>}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{session.minutes}</p>
                      <p className="text-xs text-muted-foreground">minutes</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
