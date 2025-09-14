import { ReactNode } from 'react';
import { requireAdmin } from '@/lib/serverAuth';
import AdminLayoutClient from '@/components/admin/AdminLayoutClient';

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  // Require admin role - this will redirect if not admin
  await requireAdmin();

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
