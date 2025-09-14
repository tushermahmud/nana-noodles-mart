import type { SessionOptions } from 'iron-session';

export interface SessionData {
  isLoggedIn: boolean;
  user_id?: string;
  username?: string;
  accessToken?: string;
  refreshToken?: string;
  role?: string;
}

const sessionPassword =
  process.env.NEXT_PUBLIC_SESSION_PASSWORD ||
  process.env.NEXT_PUBLIC_SESSION_PASSWORD ||
  (process.env.NODE_ENV !== 'production'
    ? 'dev-insecure-session-password-change-me-please-0123456789abcd'
    : undefined);

if (!sessionPassword) {
  throw new Error(
    'iron-session: Missing NEXT_PUBLIC_SESSION_PASSWORD env. Set a strong 32+ char secret in .env(.local).'
  );
}

export const sessionOptions: SessionOptions = {
  cookieName: process.env.SESSION_COOKIE_NAME || 'nnm_session',
  password: sessionPassword,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  },
};
