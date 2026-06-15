'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseAuth } from '@/components/supabase-auth-provider';
import { Navbar } from '@/components/navbar';
import { getAnalytics, getStudySessions } from '@/lib/supabase/queries';

export default function Analytics() {
  const { user, loading } = useSupabaseAuth();
  const router = useRouter();
  const [analytics, setAnalytics] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadAnalytics();
    }
  }, [user]);

  const loadAnalytics = async () => {
    if (!user) return;
    try {
      const [analyticsRes, sessionsRes] = await Promise.all([
        getAnalytics(user.id),
        getStudySessions(user.id),
      ]);

      if (analyticsRes.analytics) {
        setAnalytics(analyticsRes.analytics);
      }
      if (sessionsRes.data) {
        setSessions(sessionsRes.data);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setPageLoading(false);
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

  if (!user || !analytics) {
    return null;
  }

  const subjects = Object.entries(analytics.subjectBreakdown).sort((a: any, b: any) => b[1] - a[1]);
  const totalHours = (analytics.totalMinutes / 60).toFixed(1);
  const weeklyHours = (analytics.weeklyMinutes / 60).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-950 to-background">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="rounded-2xl border border-border/40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 shadow-xl">
            <p className="text-sm font-medium text-muted-foreground mb-2">Total Hours</p>
            <h3 className="text-3xl font-bold text-blue-400 mb-2">{totalHours}</h3>
            <p className="text-xs text-muted-foreground">{analytics.totalMinutes} minutes</p>
          </div>

          <div className="rounded-2xl border border-border/40 bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 shadow-xl">
            <p className="text-sm font-medium text-muted-foreground mb-2">This Week</p>
            <h3 className="text-3xl font-bold text-green-400 mb-2">{weeklyHours}</h3>
            <p className="text-xs text-muted-foreground">{analytics.weeklyMinutes} minutes</p>
          </div>

          <div className="rounded-2xl border border-border/40 bg-gradient-to-br from-orange-500/10 to-red-500/10 p-6 shadow-xl">
            <p className="text-sm font-medium text-muted-foreground mb-2">Sessions</p>
            <h3 className="text-3xl font-bold text-orange-400 mb-2">{analytics.sessionsCount}</h3>
            <p className="text-xs text-muted-foreground">completed sessions</p>
          </div>

          <div className="rounded-2xl border border-border/40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 shadow-xl">
            <p className="text-sm font-medium text-muted-foreground mb-2">Avg Per Session</p>
            <h3 className="text-3xl font-bold text-purple-400 mb-2">{Math.round(analytics.dailyAverage)}</h3>
            <p className="text-xs text-muted-foreground">minutes</p>
          </div>
        </section>

        {/* Subject Breakdown */}
        {subjects.length > 0 && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <div className="rounded-2xl border border-border/40 bg-card p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-foreground mb-6">Study Breakdown by Subject</h3>
              <div className="space-y-4">
                {subjects.map(([subject, minutes]: any, index) => {
                  const percentage = (minutes / analytics.totalMinutes) * 100;
                  const colors = [
                    'bg-blue-500',
                    'bg-purple-500',
                    'bg-pink-500',
                    'bg-green-500',
                    'bg-orange-500',
                    'bg-red-500',
                  ];
                  return (
                    <div key={subject}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-foreground">{subject}</span>
                        <span className="text-sm text-muted-foreground">{minutes}m ({percentage.toFixed(1)}%)</span>
                      </div>
                      <div className="h-2 bg-background rounded-full overflow-hidden">
                        <div
                          className={`h-full ${colors[index % colors.length]}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weekly Pattern */}
            <div className="rounded-2xl border border-border/40 bg-card p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-foreground mb-6">Daily Pattern</h3>
              <div className="space-y-3">
                {(() => {
                  const dayPatterns: { [key: string]: number } = {
                    Monday: 0,
                    Tuesday: 0,
                    Wednesday: 0,
                    Thursday: 0,
                    Friday: 0,
                    Saturday: 0,
                    Sunday: 0,
                  };

                  sessions.forEach((session: any) => {
                    const date = new Date(session.date);
                    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    const dayName = days[date.getDay()];
                    dayPatterns[dayName] += session.minutes;
                  });

                  return Object.entries(dayPatterns).map(([day, minutes]: any) => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground w-20">{day}</span>
                      <div className="flex-1 mx-4 h-6 bg-background rounded flex items-center">
                        {minutes > 0 && (
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded"
                            style={{ width: `${Math.min((minutes / 120) * 100, 100)}%` }}
                          ></div>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-foreground w-12 text-right">{minutes}m</span>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </section>
        )}

        {/* Empty State */}
        {!analytics || subjects.length === 0 && (
          <div className="rounded-2xl border border-border/40 bg-card p-12 text-center">
            <p className="text-muted-foreground text-lg">
              No study data yet. Start logging sessions on the dashboard to see analytics!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
