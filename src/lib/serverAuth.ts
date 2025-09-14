import { getSession } from '@/actions/auth.actions';
import { isAdmin } from './roleUtils';
import { redirect } from 'next/navigation';

/**
 * Server-side function to check if user is admin
 * Redirects to home if not admin
 */
export async function requireAdmin() {
  const session = await getSession();
  
  if (!session.isLoggedIn) {
    redirect('/login');
  }
  
  if (!isAdmin(session)) {
    redirect('/');
  }
  
  return session;
}

/**
 * Server-side function to check if user is authenticated
 * Redirects to login if not authenticated
 */
export async function requireAuth() {
  const session = await getSession();
  
  if (!session.isLoggedIn) {
    redirect('/login');
  }
  
  return session;
}

/**
 * Server-side function to get session without redirecting
 */
export async function getServerSession() {
  return await getSession();
}

/**
 * Server-side function to check if user is admin without redirecting
 */
export async function isServerAdmin() {
  const session = await getSession();
  return isAdmin(session);
}
