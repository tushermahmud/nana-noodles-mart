'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_ENDPOINTS } from '@/api/auth';
import {
  LoginResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  User,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from '@/types/auth';
import { performFetch } from '@/lib/apiUtils';
import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from '@/lib/session';

export async function loginUser(data: LoginRequest) {
  const res = await performFetch<LoginResponse>(AUTH_ENDPOINTS.LOGIN, {
    method: 'POST',
    body: data,
    includeAuthorization: false,
  });

  if (res && res?.isSuccess && res?.data) {
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
    session.isLoggedIn = true;
    session.accessToken = res.data.data?.token;
    session.refreshToken = res.data.data?.refreshToken;
    session.user_id = res.data.data?.user?.id;
    session.role = res.data.data?.user?.type ?? 'user';
    await session.save();
    revalidateTag('getCurrentUser');
  }

  return res;
}

export async function forgotPassword(email: string) {
  const res = await performFetch<ForgotPasswordResponse>(AUTH_ENDPOINTS.FORGOT_PASSWORD, {
    method: 'POST',
    body: { email },
    includeAuthorization: false,
  });
  console.log('🔄 AUTH_MAIN: Forgot password response:', res);
  if (res && res?.isSuccess) {
    return res;
  }
}

export async function registerUser(data: RegisterRequest) {
  const res = await performFetch<RegisterResponse>(AUTH_ENDPOINTS.REGISTER, {
    method: 'POST',
    body: data,
    includeAuthorization: false,
  });
  if (res && res?.isSuccess) {
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

  if (res.isSuccess) {
    revalidateTag('getCurrentUser');
  }

  return res;
}

export async function updateUserProfile(data: Partial<User>) {
  const res = await performFetch<User>(AUTH_ENDPOINTS.UPDATE_PROFILE, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });

  if (res.isSuccess) {
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

export async function resetPassword(data: { email: string; token: string; newPassword: string }) {
  const res = await performFetch<void>(AUTH_ENDPOINTS.RESET_PASSWORD, {
    method: 'POST',
    body: data,
  });

  return res;
}

export async function verifyEmail(token: string) {
  const res = await performFetch<void>(AUTH_ENDPOINTS.VERIFY_EMAIL, {
    method: 'POST',
    body: JSON.stringify({ token }),
  });

  if (res.isSuccess) {
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

// NEW: Refresh token functionality
export async function refreshAccessToken() {
  try {
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
    console.log('session', session);
    if (!session?.refreshToken) {
      console.log('❌ No refresh token available');
      return { success: false, message: 'No refresh token available' };
    }

    console.log('🔄 AUTH_MAIN: Attempting to refresh token...');
    console.log(
      '🔄 AUTH_MAIN: Current refresh token (first 20 chars):',
      session.refreshToken.substring(0, 20) + '...'
    );
    console.log('🔄 AUTH_MAIN: User ID:', session.user_id);

    const refreshPromise = performFetch<LoginResponse>(AUTH_ENDPOINTS.REFRESH_TOKEN, {
      method: 'POST',
      body: { refresh_token: session.refreshToken, user_id: session.user_id },
      includeAuthorization: false,
    });

    const res = await refreshPromise;
    console.log('🔄 AUTH_MAIN: Refresh response:', res);
    if (res && res?.isSuccess && res?.data) {
      console.log('✅ AUTH_MAIN: Token refresh successful!');
      console.log(
        '✅ AUTH_MAIN: New access token (first 20 chars):',
        res.data.data?.token?.substring(0, 20) + '...'
      );
      console.log(
        '✅ AUTH_MAIN: New refresh token (first 20 chars):',
        res.data.data?.refreshToken?.substring(0, 20) + '...'
      );
      // Update session with new tokens
      session.accessToken = res.data.data?.token;
      session.refreshToken = res.data.data?.refreshToken;
      await session.save();

      return {
        success: true,
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      };
    }

    console.log('❌ AUTH_MAIN: Token refresh failed:', res?.message);
    return { success: false, message: 'Token refresh failed' };
  } catch (error) {
    console.error('❌ AUTH_MAIN: Token refresh error:', error);
    return { success: false, message: 'Token refresh error' };
  }
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
