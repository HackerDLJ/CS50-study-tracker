'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseAuth } from '@/components/supabase-auth-provider';
import { Navbar } from '@/components/navbar';
import { getStudySessions, updateStudySession, deleteStudySession } from '@/lib/supabase/queries';

interface EditingSession {
  id: string;
  subject: string;
  minutes: number;
  notes: string;
}

export default function History() {
  const { user, loading } = useSupabaseAuth();
  const router = useRouter();
  const [sessions, setSessions] = useState<any[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<EditingSession | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadSessions();
    }
  }, [user]);

  const loadSessions = async () => {
    if (!user) return;
    try {
      const { data, error } = await getStudySessions(user.id);
      if (!error && data) {
        setSessions(data);
      }
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleEdit = (session: any) => {
    setEditingId(session.id);
    setEditingData({
      id: session.id,
      subject: session.subject,
      minutes: session.minutes,
      notes: session.notes || '',
    });
  };

  const handleSaveEdit = async () => {
    if (!editingData || !editingId) return;

    setIsSaving(true);
    try {
      const { error } = await updateStudySession(
        editingId,
        editingData.subject,
        editingData.minutes,
        editingData.notes
      );

      if (!error) {
        setSessions(
          sessions.map(session =>
            session.id === editingId
              ? { ...session, ...editingData }
              : session
          )
        );
        setEditingId(null);
        setEditingData(null);
      }
    } catch (error) {
      console.error('Error updating session:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsSaving(true);
    try {
      const { error } = await deleteStudySession(id);
      if (!error) {
        setSessions(sessions.filter(session => session.id !== id));
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting session:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportCSV = () => {
    const csv = [
      ['Date', 'Subject', 'Minutes', 'Notes'],
      ...sessions.map(s => [s.date, s.subject, s.minutes, s.notes || ''])
    ]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cs50-study-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
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
        <section>
          <div className="rounded-2xl border border-border/40 bg-card p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">Study History</h3>
              {sessions.length > 0 && (
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors text-sm font-medium"
                >
                  Export CSV
                </button>
              )}
            </div>

            {sessions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No study sessions yet. Start logging on the dashboard!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-4 bg-background/50 rounded-lg border border-border/20 hover:border-border/40 transition-colors"
                  >
                    {editingId === session.id && editingData ? (
                      // Edit Mode
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                            <select
                              value={editingData.subject}
                              onChange={(e) =>
                                setEditingData({ ...editingData, subject: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
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
                              value={editingData.minutes}
                              onChange={(e) =>
                                setEditingData({
                                  ...editingData,
                                  minutes: parseInt(e.target.value),
                                })
                              }
                              className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Notes</label>
                          <textarea
                            value={editingData.notes}
                            onChange={(e) =>
                              setEditingData({ ...editingData, notes: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none h-20"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveEdit}
                            disabled={isSaving}
                            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 font-medium text-sm"
                          >
                            {isSaving ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setEditingData(null);
                            }}
                            className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                              {session.subject}
                            </span>
                            <span className="text-sm text-muted-foreground">{session.date}</span>
                          </div>
                          {session.notes && (
                            <p className="text-sm text-foreground mb-2">{session.notes}</p>
                          )}
                          <p className="text-sm text-primary font-semibold">{session.minutes} minutes</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(session)}
                            className="px-3 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(session.id)}
                            className="px-3 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Delete Confirmation */}
                    {deleteConfirm === session.id && (
                      <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-sm text-foreground mb-3">
                          Are you sure you want to delete this session?
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDelete(session.id)}
                            disabled={isSaving}
                            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 font-medium text-sm"
                          >
                            {isSaving ? 'Deleting...' : 'Delete'}
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
