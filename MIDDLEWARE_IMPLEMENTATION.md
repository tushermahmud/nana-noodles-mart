# Next.js Middleware Implementation

## Overview

This project now uses Next.js middleware for automatic token refresh and route protection. The middleware runs at the edge and handles authentication seamlessly.

## How It Works

### 1. **Automatic Token Refresh**

- Middleware checks if the access token is expired on every request
- If expired, it automatically refreshes the token using the refresh token
- Updates the session cookie with new tokens
- Continues with the original request

### 2. **Route Protection**

- Protected routes require authentication
- Unauthenticated users are redirected to `/login` with a `next` parameter
- Authenticated users trying to access auth routes are redirected to home

### 3. **Session Management**

- Uses iron-session for secure cookie-based session storage
- Tokens are stored in encrypted cookies
- No localStorage dependency

## Files Created

### Core Middleware Files

- `src/middleware.ts` - Main middleware logic
- `src/actions/auth.actions.ts` - Middleware-safe auth actions
- `src/lib/tokenUtils.ts` - JWT token utilities
- `src/config/routeConfig.ts` - Route configuration

### Updated Files

- `src/app/login/page.tsx` - Now handles redirect after login
- `src/app/register/page.tsx` - Now handles redirect after registration

## Route Configuration

### Protected Routes

```typescript
const protectedRoutes = [
  { path: /^\/admin/, description: 'Admin dashboard' },
  { path: /^\/cart/, description: 'Shopping cart' },
  { path: /^\/checkout/, description: 'Checkout process' },
  { path: /^\/profile/, description: 'User profile' },
  { path: /^\/orders/, description: 'Order history' },
  { path: /^\/account/, description: 'Account management' },
];
```

### Auth Routes (redirect authenticated users)

```typescript
const authRoutes = ['/login', '/register', '/sign-in', '/sign-up'];
```

## Flow Examples

### 1. **Accessing Protected Route (Unauthenticated)**

```
User visits /admin → Middleware checks auth → Redirects to /login?next=/admin
User logs in → Redirected to /admin
```

### 2. **Token Expired During Request**

```
User makes API request → Token expired → Middleware refreshes token → Request continues
```

### 3. **Authenticated User on Auth Route**

```
User visits /login while logged in → Middleware redirects to /
```

## Benefits

1. **🔄 Automatic Token Refresh** - No manual token management needed
2. **🛡️ Route Protection** - Seamless authentication checks
3. **⚡ Edge Performance** - Runs at the edge for fast response
4. **🔒 Secure** - Uses encrypted cookies, no localStorage
5. **🎯 User-Friendly** - Automatic redirects with proper flow

## Configuration

The middleware is configured to run on all routes except:

- API routes (`/api/*`)
- Static files (`/_next/static/*`)
- Images (`/_next/image/*`)
- Favicon
- Public assets (images, videos, fonts, etc.)

## Environment Variables

Make sure you have these environment variables set:

```env
NEXT_PUBLIC_SESSION_PASSWORD=your-32-char-secret
SESSION_COOKIE_NAME=nnm_session
```

## Testing

1. **Test Protected Routes**: Try accessing `/admin` without login
2. **Test Token Refresh**: Let a token expire and make a request
3. **Test Auth Redirects**: Try accessing `/login` while logged in
4. **Test Next Parameter**: Login from a protected route and verify redirect

The middleware provides a seamless authentication experience with automatic token management!
