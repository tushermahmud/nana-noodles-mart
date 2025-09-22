'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserSession {
  isLoggedIn: boolean;
  role?: string;
  user_id?: string;
}

export function useAuth() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch session data from server
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const sessionData = await response.json();
          setSession(sessionData);
        } else {
          setSession({ isLoggedIn: false });
        }
      } catch (error) {
        console.error('Failed to fetch session:', error);
        setSession({ isLoggedIn: false });
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const isAdmin = () => {
    return session?.isLoggedIn && session?.role === 'admin';
  };

  const isUser = () => {
    return session?.isLoggedIn && session?.role === 'user';
  };

  const isAuthenticated = () => {
    return session?.isLoggedIn || false;
  };

  const requireAdmin = () => {
    if (!isAdmin()) {
      router.push('/');
      return false;
    }
    return true;
  };

  const requireAuth = () => {
    if (!isAuthenticated()) {
      router.push('/login');
      return false;
    }
    return true;
  };

  return {
    session,
    loading,
    isAdmin: isAdmin(),
    isUser: isUser(),
    isAuthenticated: isAuthenticated(),
    requireAdmin,
    requireAuth,
  };
}
