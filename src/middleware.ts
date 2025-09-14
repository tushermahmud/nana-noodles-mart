import { NextResponse, type NextRequest } from "next/server";
import { sealData } from "iron-session";

import { getSession, renewSession } from "./actions/auth.actions";
import { protectedRoutes, authRoutes } from "./config/routeConfig";
import { sessionOptions } from "./lib/session";
import { isTokenExpired } from "./lib/tokenUtils";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const isAuthenticated = session.isLoggedIn;

  // Debug logging for every request
  console.log(`🔍 MIDDLEWARE: ${request.method} ${request.nextUrl.pathname}`);
  console.log(`🔍 MIDDLEWARE: Is authenticated: ${isAuthenticated}`);
  console.log(`🔍 MIDDLEWARE: Has access token: ${!!session.accessToken}`);
  console.log(`🔍 MIDDLEWARE: Has refresh token: ${!!session.refreshToken}`);

  const response = NextResponse.next();

  // Check if the access token is expired then renew it
  console.log('🔍 MIDDLEWARE: Full session object:', JSON.stringify(session, null, 2));
  if (session.accessToken && session.refreshToken) {
    const accessTokenExpired = isTokenExpired(session.accessToken);
    const refreshTokenExpired = isTokenExpired(session.refreshToken);
    
    console.log(`🔍 MIDDLEWARE: Access token expired: ${accessTokenExpired}`);
    console.log(`🔍 MIDDLEWARE: Refresh token expired: ${refreshTokenExpired}`);
    
    // Debug: Show token expiration times
    try {
      const accessDecoded = JSON.parse(atob(session.accessToken.split('.')[1]));
      const refreshDecoded = JSON.parse(atob(session.refreshToken.split('.')[1]));
      const now = new Date();
      const accessExp = new Date(accessDecoded.exp * 1000);
      const refreshExp = new Date(refreshDecoded.exp * 1000);
      
      console.log(`🔍 MIDDLEWARE: Current time: ${now.toLocaleString()}`);
      console.log(`🔍 MIDDLEWARE: Access token expires at: ${accessExp.toLocaleString()}`);
      console.log(`🔍 MIDDLEWARE: Refresh token expires at: ${refreshExp.toLocaleString()}`);
      console.log(`🔍 MIDDLEWARE: Time until access expires: ${Math.round((accessExp.getTime() - now.getTime()) / 1000)} seconds`);
      console.log(`🔍 MIDDLEWARE: Time until refresh expires: ${Math.round((refreshExp.getTime() - now.getTime()) / 1000)} seconds`);
    } catch (e) {
      console.log('🔍 MIDDLEWARE: Could not decode tokens for debugging:', (e as unknown as Error).message);
    }
    
    if (accessTokenExpired) {
      console.log('🔄 MIDDLEWARE: Access token expired, checking refresh token...');
      console.log(`🔄 MIDDLEWARE: Expired Access Token: ${session.accessToken.substring(0, 20)}...`);
      console.log(`🔄 MIDDLEWARE: Available Refresh Token: ${session.refreshToken.substring(0, 20)}...`);
      
      // Also check if refresh token is expired
      if (refreshTokenExpired) {
        console.log('❌ MIDDLEWARE: Refresh token also expired, clearing session');
        console.log(`❌ MIDDLEWARE: Expired Refresh Token: ${session.refreshToken.substring(0, 20)}...`);
        const res = NextResponse.next();
        res.cookies.delete(sessionOptions.cookieName);
        return res;
      }
      
      try {
        console.log('🔄 MIDDLEWARE: Attempting to refresh tokens...');
        console.log('🔄 MIDDLEWARE: Current refresh token before refresh:', session.refreshToken.substring(0, 20) + '...');
        
        const newSession = await renewSession();
        
        console.log('🔄 MIDDLEWARE: Renew session result:', {
          isLoggedIn: newSession.isLoggedIn,
          hasAccessToken: !!newSession.accessToken,
          hasRefreshToken: !!newSession.refreshToken,
          newAccessToken: newSession.accessToken?.substring(0, 20) + '...',
          newRefreshToken: newSession.refreshToken?.substring(0, 20) + '...'
        });
        
        if (newSession.isLoggedIn) {
          console.log('✅ MIDDLEWARE: Token refresh successful!');
          console.log(`✅ MIDDLEWARE: New Access Token: ${newSession.accessToken?.substring(0, 20)}...`);
          console.log(`✅ MIDDLEWARE: New Refresh Token: ${newSession.refreshToken?.substring(0, 20)}...`);
          
          // Create a new response with updated session
          const sealed = await sealData(newSession, sessionOptions);
          const res = NextResponse.next();
          res.cookies.set(sessionOptions.cookieName, sealed, sessionOptions.cookieOptions);
          return res;
        } else {
          console.log('❌ MIDDLEWARE: Token refresh failed, clearing session');
          console.log('❌ MIDDLEWARE: Failed session details:', newSession);
          // Refresh failed, clear session
          const res = NextResponse.next();
          res.cookies.delete(sessionOptions.cookieName);
          return res;
        }
      } catch (err) {
        console.error('❌ MIDDLEWARE: Session renewal failed:', err);
        // Remove cookies on error
        const res = NextResponse.next();
        res.cookies.delete(sessionOptions.cookieName);
        return res;
      }
    }
  }

  // Get current path and query params
  const path = request.nextUrl.pathname;
  const queryParams = request.nextUrl.searchParams.toString();

  // Check if the path matches any protected route
  const isProtectedRoute = protectedRoutes.some((route) => route.path.test(path));
  
  // Check if the path is an auth route (login/register)
  const isAuthRoute = authRoutes.some((authPath) => path.startsWith(authPath));

  // If user is authenticated and trying to access auth routes, redirect to home
  if (isAuthenticated && !isTokenExpired(session.refreshToken as string) && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the path is not protected, allow access
  if (!isProtectedRoute) {
    return response;
  }

  // If the path is protected and user is not authenticated, redirect to login
  if (!isAuthenticated) {
    const redirectUrl = new URL("/login", request.url);
    if (queryParams) {
      redirectUrl.searchParams.append("next", `${path}?${queryParams}`);
    } else {
      redirectUrl.searchParams.append("next", path);
    }
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp|mp4|webm|ogg|mp3|wav|flac|aac|woff|woff2|ttf|eot|css|js|map)).*)',
  ],
};