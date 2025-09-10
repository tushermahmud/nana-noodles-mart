'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_ENDPOINTS } from '@/api/auth';
import { LoginResponse, LoginRequest, RegisterRequest, RegisterResponse, User } from '@/types/auth';
import { performFetch } from '@/lib/apiUtils';
import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from '@/lib/session';

export async function loginUser(data: LoginRequest) {
  const res = await performFetch<LoginResponse>(AUTH_ENDPOINTS.LOGIN, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (res && res?.success) {
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
    session.isLoggedIn = true;
    session.accessToken = res.data?.authorization?.access_token;
    session.refreshToken = res.data?.authorization?.refresh_token;
    await session.save();
    revalidateTag('getCurrentUser');
  }

  return res;
}

export async function registerUser(data: RegisterRequest) {
  const res = await performFetch<RegisterResponse>(AUTH_ENDPOINTS.REGISTER, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (res && res?.success) {
    revalidateTag('getCurrentUser');
  }

  return res;
}

export async function logoutUser() {
  const res = await performFetch<void>(AUTH_ENDPOINTS.LOGOUT, {
    method: 'POST',
  });

  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  session.destroy();

  if (res.success) {
    revalidateTag('getCurrentUser');
  }

  return res;
}

export async function updateUserProfile(data: Partial<User>) {
  const res = await performFetch<User>(AUTH_ENDPOINTS.UPDATE_PROFILE, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });

  if (res.success) {
    revalidateTag('getCurrentUser');
  }

  return res;
}

export async function changePassword(data: { currentPassword: string; newPassword: string }) {
  const res = await performFetch<void>(AUTH_ENDPOINTS.CHANGE_PASSWORD, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return res;
}

export async function requestPasswordReset(email: string) {
  const res = await performFetch<void>(AUTH_ENDPOINTS.FORGOT_PASSWORD, {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

  return res;
}

export async function resetPassword(data: { token: string; newPassword: string }) {
  const res = await performFetch<void>(AUTH_ENDPOINTS.RESET_PASSWORD, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return res;
}

export async function verifyEmail(token: string) {
  const res = await performFetch<void>(AUTH_ENDPOINTS.VERIFY_EMAIL, {
    method: 'POST',
    body: JSON.stringify({ token }),
  });

  if (res.success) {
    revalidateTag('getCurrentUser');
  }

  return res;
}

export async function resendVerificationEmail() {
  const res = await performFetch<void>(AUTH_ENDPOINTS.RESEND_VERIFICATION, {
    method: 'POST',
  });

  return res;
}

export async function getSessionTokenClient() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  if (!session?.isLoggedIn) return null;
  return {
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
  };
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
  }
  return session;
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect('/login');
}
