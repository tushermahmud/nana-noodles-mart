'use client';

import { useAuth } from '@/hooks/useAuth';
import { ReactNode } from 'react';

interface AdminGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Client-side component that only renders children if user is admin
 * Use this for conditional rendering of admin-only UI elements
 */
export function AdminGuard({ children, fallback = null }: AdminGuardProps) {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Hook to check admin status in client components
 */
export function useAdminGuard() {
  const { isAdmin, loading, requireAdmin } = useAuth();

  return {
    isAdmin,
    loading,
    requireAdmin,
  };
}
