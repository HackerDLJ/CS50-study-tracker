'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  avatar: string;
  login: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGithub: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('cs50-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('cs50-user');
      }
    }
    setLoading(false);
  }, []);

  const loginWithGithub = () => {
    // For demo, we'll simulate GitHub login
    // In production, integrate with GitHub OAuth
    const mockUser: User = {
      id: '1',
      name: 'CS50 Student',
      avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
      login: 'cs50-student',
    };
    setUser(mockUser);
    localStorage.setItem('cs50-user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cs50-user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGithub, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
