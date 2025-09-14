import { isTokenExpired, getTokenExpiration, getTimeUntilExpiration } from './tokenUtils';

/**
 * Debug utility to check token status
 * Use this in your components or console to debug token issues
 */
export function debugTokens(accessToken?: string, refreshToken?: string) {
  console.log('🔍 Token Debug Information:');
  console.log('================================');
  
  if (!accessToken) {
    console.log('❌ No access token');
  } else {
    const accessExpired = isTokenExpired(accessToken);
    const accessExpiration = getTokenExpiration(accessToken);
    const accessTimeLeft = getTimeUntilExpiration(accessToken);
    
    console.log('🔑 Access Token:');
    console.log(`  - Expired: ${accessExpired ? '❌ YES' : '✅ NO'}`);
    console.log(`  - Expires at: ${accessExpiration ? new Date(accessExpiration).toLocaleString() : 'Unknown'}`);
    console.log(`  - Time left: ${Math.round(accessTimeLeft / 1000)} seconds`);
    console.log(`  - Token (first 20 chars): ${accessToken.substring(0, 20)}...`);
  }
  
  console.log('---');
  
  if (!refreshToken) {
    console.log('❌ No refresh token');
  } else {
    const refreshExpired = isTokenExpired(refreshToken);
    const refreshExpiration = getTokenExpiration(refreshToken);
    const refreshTimeLeft = getTimeUntilExpiration(refreshToken);
    
    console.log('🔄 Refresh Token:');
    console.log(`  - Expired: ${refreshExpired ? '❌ YES' : '✅ NO'}`);
    console.log(`  - Expires at: ${refreshExpiration ? new Date(refreshExpiration).toLocaleString() : 'Unknown'}`);
    console.log(`  - Time left: ${Math.round(refreshTimeLeft / 1000)} seconds`);
    console.log(`  - Token (first 20 chars): ${refreshToken.substring(0, 20)}...`);
  }
  
  console.log('================================');
}

/**
 * Check if tokens are in a valid state for refresh
 */
export function canRefreshTokens(accessToken?: string, refreshToken?: string): boolean {
  if (!accessToken || !refreshToken) return false;
  
  const accessExpired = isTokenExpired(accessToken);
  const refreshExpired = isTokenExpired(refreshToken);
  
  // Can refresh if access is expired but refresh is still valid
  return accessExpired && !refreshExpired;
}

/**
 * Get token status summary
 */
export function getTokenStatus(accessToken?: string, refreshToken?: string) {
  if (!accessToken || !refreshToken) {
    return { status: 'no_tokens', message: 'No tokens available' };
  }
  
  const accessExpired = isTokenExpired(accessToken);
  const refreshExpired = isTokenExpired(refreshToken);
  
  if (!accessExpired && !refreshExpired) {
    return { status: 'valid', message: 'Both tokens are valid' };
  }
  
  if (accessExpired && !refreshExpired) {
    return { status: 'needs_refresh', message: 'Access token expired, refresh token valid' };
  }
  
  if (accessExpired && refreshExpired) {
    return { status: 'expired', message: 'Both tokens expired, need to login' };
  }
  
  return { status: 'unknown', message: 'Unknown token state' };
}
