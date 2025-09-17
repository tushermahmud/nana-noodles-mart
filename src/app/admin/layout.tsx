import { ReactNode } from 'react';
import { requireAdmin } from '@/lib/serverAuth';
import AdminLayoutClient from '@/components/admin/AdminLayoutClient';
import { getDashboardStats } from '@/fetchers/admin';

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  // Require admin role - this will redirect if not admin
  await requireAdmin();
  const dashboardStatsRes = await getDashboardStats();
  const dashboardStats = dashboardStatsRes?.data ?? null;
  console.log(dashboardStats);

  return <AdminLayoutClient dashboardStats={dashboardStats}>{children}</AdminLayoutClient>;
}
