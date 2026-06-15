'use client';

import { createClient } from './client';

// Helper function to get Supabase client
function getSupabase() {
  return createClient();
}

// Study Sessions
export async function addStudySession(userId: string, subject: string, minutes: number, notes?: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('study_sessions')
    .insert([{ user_id: userId, subject, minutes, notes, date: new Date().toISOString().split('T')[0] }])
    .select();
  return { data, error };
}

export async function getStudySessions(userId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('study_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  return { data, error };
}

export async function updateStudySession(id: string, subject: string, minutes: number, notes?: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('study_sessions')
    .update({ subject, minutes, notes, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();
  return { data, error };
}

export async function deleteStudySession(id: string) {
  const supabase = getSupabase();
  const { error } = await supabase.from('study_sessions').delete().eq('id', id);
  return { error };
}

export async function getTotalStudyMinutes(userId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('study_sessions')
    .select('minutes')
    .eq('user_id', userId);
  
  if (error) return { total: 0, error };
  const total = data?.reduce((sum, session) => sum + session.minutes, 0) || 0;
  return { total, error: null };
}

// Study Goals
export async function addStudyGoal(userId: string, goalName: string, targetMinutes: number, goalType: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('study_goals')
    .insert([{ user_id: userId, goal_name: goalName, target_minutes: targetMinutes, goal_type: goalType }])
    .select();
  return { data, error };
}

export async function getStudyGoals(userId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('study_goals')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function updateStudyGoal(id: string, isCompleted: boolean) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('study_goals')
    .update({ is_completed: isCompleted })
    .eq('id', id)
    .select();
  return { data, error };
}

// Study Streaks
export async function getStudyStreak(userId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('study_streaks')
    .select('*')
    .eq('user_id', userId)
    .single();
  return { data, error };
}

export async function updateStudyStreak(userId: string, currentStreak: number, longestStreak: number) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('study_streaks')
    .update({ current_streak: currentStreak, longest_streak: longestStreak, last_study_date: new Date().toISOString().split('T')[0] })
    .eq('user_id', userId)
    .select();
  return { data, error };
}

// Analytics
export async function getAnalytics(userId: string) {
  const supabase = getSupabase();
  const { data: sessions, error } = await supabase
    .from('study_sessions')
    .select('*')
    .eq('user_id', userId);

  if (error) return { analytics: null, error };

  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const totalMinutes = sessions?.reduce((sum, session) => sum + session.minutes, 0) || 0;
  const weeklyMinutes = sessions?.reduce((sum, session) => {
    const sessionDate = new Date(session.date);
    return sessionDate >= weekAgo ? sum + session.minutes : sum;
  }, 0) || 0;

  const subjectBreakdown: { [key: string]: number } = {};
  sessions?.forEach(session => {
    subjectBreakdown[session.subject] = (subjectBreakdown[session.subject] || 0) + session.minutes;
  });

  return {
    analytics: {
      totalMinutes,
      weeklyMinutes,
      dailyAverage: totalMinutes / (sessions?.length || 1),
      subjectBreakdown,
      sessionsCount: sessions?.length || 0,
    },
    error: null,
  };
}

// GitHub Repos
export async function addGitHubRepo(userId: string, repoName: string, repoUrl: string, description?: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('github_repos')
    .insert([{ user_id: userId, repo_name: repoName, repo_url: repoUrl, description }])
    .select();
  return { data, error };
}

export async function getGitHubRepos(userId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('github_repos')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data, error };
}

// Profile
export async function getProfile(userId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
}

export async function updateProfile(userId: string, updates: any) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select();
  return { data, error };
}
