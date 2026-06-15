'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseAuth } from '@/components/supabase-auth-provider';
import { Navbar } from '@/components/navbar';
import { addStudyGoal, getStudyGoals, updateStudyGoal } from '@/lib/supabase/queries';

export default function Goals() {
  const { user, loading } = useSupabaseAuth();
  const router = useRouter();
  const [goals, setGoals] = useState<any[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [formData, setFormData] = useState({
    goalName: '',
    targetMinutes: '',
    goalType: 'weekly',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadGoals();
    }
  }, [user]);

  const loadGoals = async () => {
    if (!user) return;
    try {
      const { data, error } = await getStudyGoals(user.id);
      if (!error && data) {
        setGoals(data);
      }
    } catch (error) {
      console.error('Error loading goals:', error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.goalName || !formData.targetMinutes || !user) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await addStudyGoal(
        user.id,
        formData.goalName,
        parseInt(formData.targetMinutes),
        formData.goalType
      );

      if (!error && data) {
        setGoals([data[0], ...goals]);
        setFormData({ goalName: '', targetMinutes: '', goalType: 'weekly' });
      }
    } catch (error) {
      console.error('Error adding goal:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleGoal = async (goalId: string, isCompleted: boolean) => {
    try {
      await updateStudyGoal(goalId, !isCompleted);
      setGoals(
        goals.map(goal =>
          goal.id === goalId ? { ...goal, is_completed: !isCompleted } : goal
        )
      );
    } catch (error) {
      console.error('Error updating goal:', error);
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

  const activeGoals = goals.filter(g => !g.is_completed);
  const completedGoals = goals.filter(g => g.is_completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-950 to-background">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Create Goal Form */}
        <section className="mb-12">
          <div className="rounded-2xl border border-border/40 bg-card p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-foreground mb-6">Set a New Goal</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Goal Name</label>
                  <input
                    type="text"
                    value={formData.goalName}
                    onChange={(e) => setFormData({ ...formData, goalName: e.target.value })}
                    placeholder="e.g., Complete Data Structures module"
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Target Minutes</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.targetMinutes}
                    onChange={(e) => setFormData({ ...formData, targetMinutes: e.target.value })}
                    placeholder="600"
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Goal Type</label>
                <select
                  value={formData.goalType}
                  onChange={(e) => setFormData({ ...formData, goalType: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating Goal...' : 'Create Goal'}
              </button>
            </form>
          </div>
        </section>

        {/* Active Goals */}
        {activeGoals.length > 0 && (
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6">Active Goals ({activeGoals.length})</h3>
            <div className="space-y-4">
              {activeGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="rounded-2xl border border-border/40 bg-card p-6 shadow-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-foreground mb-2">{goal.goal_name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                          {goal.goal_type.charAt(0).toUpperCase() + goal.goal_type.slice(1)}
                        </span>
                        <span>Target: {goal.target_minutes} minutes</span>
                        <span>Created: {new Date(goal.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleGoal(goal.id, goal.is_completed)}
                      className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors font-medium"
                    >
                      Mark Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold text-foreground mb-6">Completed Goals ({completedGoals.length})</h3>
            <div className="space-y-4">
              {completedGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="rounded-2xl border border-border/40 bg-card/50 p-6 shadow-lg opacity-75"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-foreground mb-2 line-through">{goal.goal_name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full">
                          {goal.goal_type.charAt(0).toUpperCase() + goal.goal_type.slice(1)}
                        </span>
                        <span>Target: {goal.target_minutes} minutes</span>
                        <span>Completed on: {new Date(goal.updated_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 font-medium">
                      ✓ Completed
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {goals.length === 0 && (
          <div className="rounded-2xl border border-border/40 bg-card p-12 text-center">
            <p className="text-muted-foreground text-lg mb-4">No goals yet. Create one to get started!</p>
            <p className="text-sm text-muted-foreground">Set study goals to keep yourself motivated and track progress.</p>
          </div>
        )}
      </main>
    </div>
  );
}
