import { SessionData } from './session';

/**
 * Check if the current session has admin role
 */
export function isAdmin(session: SessionData): boolean {
  return session.isLoggedIn && session.role === 'admin';
}

/**
 * Check if the current session has user role
 */
export function isUser(session: SessionData): boolean {
  return session.isLoggedIn && session.role === 'user';
}

/**
 * Get the user role from session
 */
export function getUserRole(session: SessionData): string | null {
  return session.role || null;
}

/**
 * Check if user has specific role
 */
export function hasRole(session: SessionData, role: string): boolean {
  return session.isLoggedIn && session.role === role;
}
