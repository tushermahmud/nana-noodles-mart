interface JwtPayload {
  exp: number;
  iat: number;
  [key: string]: any;
}

/**
 * Decode JWT token without external dependencies
 * @param token - The JWT token to decode
 * @returns decoded payload or null if invalid
 */
function decodeJWT(token: string): JwtPayload | null {
  if (!token) return null;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

/**
 * Check if a JWT token is expired
 * @param token - The JWT token to check
 * @returns true if the token is expired, false otherwise
 */
export function isTokenExpired(token: string): boolean {
  if (!token) {
    console.log('🔍 TOKEN_UTILS: No token provided');
    return true;
  }

  try {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) {
      console.log('🔍 TOKEN_UTILS: Token has no expiration or invalid format');
      return true;
    }

    const currentTime = Date.now() / 1000; // Convert to seconds
    const tokenExp = decoded.exp;
    const timeUntilExpiry = tokenExp - currentTime;
    const isExpired = tokenExp < currentTime;

    console.log(`🔍 TOKEN_UTILS: Token expires at: ${new Date(tokenExp * 1000).toLocaleString()}`);
    console.log(`🔍 TOKEN_UTILS: Current time: ${new Date(currentTime * 1000).toLocaleString()}`);
    console.log(`🔍 TOKEN_UTILS: Time until expiry: ${Math.round(timeUntilExpiry)} seconds`);
    console.log(`🔍 TOKEN_UTILS: Is expired: ${isExpired}`);

    return isExpired;
  } catch (error) {
    console.error('🔍 TOKEN_UTILS: Error checking token expiration:', error);
    return true; // If we can't decode it, consider it expired
  }
}

/**
 * Get token expiration time in milliseconds
 * @param token - The JWT token
 * @returns expiration time in milliseconds, or null if invalid
 */
export function getTokenExpiration(token: string): number | null {
  if (!token) return null;

  try {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) return null;
    return decoded.exp * 1000; // Convert to milliseconds
  } catch (error) {
    console.error('Error getting token expiration:', error);
    return null;
  }
}

/**
 * Get time until token expires in milliseconds
 * @param token - The JWT token
 * @returns milliseconds until expiration, or 0 if expired/invalid
 */
export function getTimeUntilExpiration(token: string): number {
  const expiration = getTokenExpiration(token);
  if (!expiration) return 0;

  const now = Date.now();
  return Math.max(0, expiration - now);
}
