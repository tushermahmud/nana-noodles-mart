'use server';

import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from '@/lib/session';
import { AUTH_ENDPOINTS } from '@/api/auth';
import { LoginResponse } from '@/types/auth';

/**
 * Get the current session from cookies
 * This is safe to use in middleware
 */
export async function getSession(): Promise<SessionData> {
  try {
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
    
    return {
      isLoggedIn: session.isLoggedIn || false,
      user_id: session.user_id,
      username: session.username,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    };
  } catch (error) {
    console.error('Error getting session:', error);
    return {
      isLoggedIn: false,
    };
  }
}

/**
 * Renew the session by refreshing the access token
 * This is safe to use in middleware
 */
export async function renewSession(): Promise<SessionData> {
  try {
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

    console.log('🔄 AUTH_ACTIONS: Starting token refresh process...');
    console.log('🔄 AUTH_ACTIONS: Session details:', {
      isLoggedIn: session.isLoggedIn,
      hasRefreshToken: !!session.refreshToken,
      hasUserId: !!session.user_id,
      refreshToken: session.refreshToken?.substring(0, 20) + '...',
      userId: session.user_id
    });

    if (!session?.refreshToken) {
      console.log('❌ AUTH_ACTIONS: No refresh token available');
      throw new Error('No refresh token available');
    }

    console.log('🔄 AUTH_ACTIONS: Attempting to refresh token...');
    console.log('🔄 AUTH_ACTIONS: Current refresh token (first 20 chars):', session.refreshToken.substring(0, 20) + '...');
    console.log('🔄 AUTH_ACTIONS: User ID:', session.user_id);

    // Call the refresh endpoint directly
    const response = await fetch(AUTH_ENDPOINTS.REFRESH_TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.refreshToken}`,
      },
    });

    console.log('🔄 AUTH_ACTIONS: Refresh response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ AUTH_ACTIONS: Refresh failed with response:', errorText);
      console.log('❌ AUTH_ACTIONS: Response status:', response.status);
      throw new Error(`Token refresh failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('🔄 AUTH_ACTIONS: Refresh response data:', {
      execStatus: data?.execStatus,
      hasAccessToken: !!data?.data?.token,
      hasRefreshToken: !!data?.data?.refreshToken,
    });

    if (data?.execStatus && data?.data) {
      console.log('✅ AUTH_ACTIONS: Token refresh successful!');
      console.log('✅ AUTH_ACTIONS: New access token (first 20 chars):', data.data.token.substring(0, 20) + '...');
      console.log('✅ AUTH_ACTIONS: New refresh token (first 20 chars):', data.data.refreshToken.substring(0, 20) + '...');
      
      // Update session with new tokens
      const updatedSession: SessionData = {
        isLoggedIn: true,
        user_id: session.user_id,
        username: session.username,
        accessToken: data.data.token,
        refreshToken: data.data.refreshToken,
      };

      // Update the session
      session.accessToken = updatedSession.accessToken;
      session.refreshToken = updatedSession.refreshToken;
      await session.save();

      return updatedSession;
    }

    console.log('❌ AUTH_ACTIONS: Invalid refresh response structure:', data);
    throw new Error('Invalid refresh response');
  } catch (error) {
    console.error('❌ AUTH_ACTIONS: Token refresh error:', error);
    
    // Return empty session on error
    return {
      isLoggedIn: false,
    };
  }
}
