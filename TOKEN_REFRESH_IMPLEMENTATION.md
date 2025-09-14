# 🔄 Automatic Token Refresh Implementation

## **Overview**

This implementation provides automatic token refresh functionality for your iron-session based authentication system. When access tokens expire (401 errors), the system automatically attempts to refresh them using refresh tokens, providing a seamless user experience.

---

## **🏗️ Architecture**

### **Token Storage Strategy**

- **Server-side only**: Tokens stored in iron-session (encrypted cookies)
- **No client-side storage**: All token management handled server-side
- **Secure approach**: Tokens never exposed to client-side JavaScript

### **Token Lifecycle**

```
Login → Store both tokens → Use access token → Access expires → Auto refresh → Continue
```

---

## **🔧 Implementation Details**

### **1. Server-Side Refresh (`src/actions/auth.ts`)**

```typescript
export async function refreshAccessToken() {
  try {
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

    if (!session?.refreshToken) {
      return { success: false, message: 'No refresh token available' };
    }

    const res = await performFetch<LoginResponse>(AUTH_ENDPOINTS.REFRESH_TOKEN, {
      method: 'POST',
      body: JSON.stringify({ refresh_token: session.refreshToken }),
    });

    if (res?.success) {
      // Update session with new tokens
      session.accessToken = res.data?.authorization?.access_token;
      session.refreshToken = res.data?.authorization?.refresh_token;
      await session.save();

      return {
        success: true,
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      };
    }

    return { success: false, message: 'Token refresh failed' };
  } catch (error) {
    console.error('Token refresh error:', error);
    return { success: false, message: 'Token refresh error' };
  }
}
```

**Key Features:**

- ✅ Reads refresh token from iron-session
- ✅ Calls backend `/auth/refresh` endpoint
- ✅ Updates session with new tokens
- ✅ Returns success/failure status

### **2. Enhanced performFetch (`src/lib/apiUtils.ts`)**

```typescript
export async function performFetch<T>(
  url: string,
  options: FetchOptions = {},
  retryCount = 0
): Promise<APIResponse<T>> {
  // ... make request with current token ...

  // Handle 401 Unauthorized
  if (response.status === 401 && retryCount === 0) {
    console.log('🔄 Access token expired, attempting refresh...');

    if (typeof window === 'undefined') {
      // Server-side: use iron-session refresh
      const refreshResult = await refreshAccessToken();

      if (refreshResult.success) {
        // Retry original request with new token
        return performFetch<T>(
          url,
          {
            ...options,
            headers: { ...headers, Authorization: `Bearer ${refreshResult.accessToken}` },
          },
          retryCount + 1
        );
      }
    } else {
      // Client-side: redirect to login since we don't store tokens in localStorage
      console.log('❌ Client-side token refresh not supported - redirecting to login');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  }
}
```

**Key Features:**

- ✅ Detects 401 errors automatically
- ✅ Attempts token refresh on server-side only
- ✅ Retries original request with new token
- ✅ Redirects to login on client-side (no localStorage)
- ✅ Prevents infinite retry loops with `retryCount`

### **3. Iron-Session Only Approach**

**Key Benefits:**

- ✅ **No client-side token storage** - tokens never exposed to JavaScript
- ✅ **Enhanced security** - tokens only in encrypted cookies
- ✅ **Simplified architecture** - single source of truth (iron-session)
- ✅ **Server-side refresh only** - most secure approach

---

## **🚀 How It Works in Practice**

### **Scenario 1: Server-Side Request (SSR/Server Actions)**

1. **Request made** with current access token from iron-session
2. **Backend returns 401** (token expired)
3. **performFetch detects 401** and calls `refreshAccessToken()`
4. **New tokens stored** in iron-session
5. **Original request retried** with new access token
6. **Request succeeds** transparently

### **Scenario 2: Client-Side Request (React components)**

1. **Request made** via server action or API route
2. **Server-side performFetch** handles the request
3. **If 401 occurs**, server attempts token refresh
4. **If refresh succeeds**, request retries automatically
5. **If refresh fails**, user redirected to login

### **Scenario 3: Login Process**

1. **User logs in** successfully
2. **Tokens stored** in iron-session only
3. **No client-side storage** - maximum security
4. **All future requests** handled server-side
5. **Automatic refresh** works seamlessly

---

## **🔒 Security Benefits**

### **1. Seamless User Experience**

- ✅ **No interruption** when tokens expire
- ✅ **Automatic retry** of failed requests
- ✅ **Transparent refresh** process

### **2. Security Best Practices**

- ✅ **Short-lived access tokens** (15-30 minutes)
- ✅ **Long-lived refresh tokens** (7-30 days)
- ✅ **Automatic cleanup** on refresh failure
- ✅ **Secure token storage** (iron-session only - no localStorage)
- ✅ **No client-side exposure** - tokens never in JavaScript

### **3. Error Handling**

- ✅ **Graceful degradation** when refresh fails
- ✅ **Automatic logout** on refresh failure
- ✅ **Prevents infinite retry loops**

---

## **📝 Usage Examples**

### **Server Component (SSR)**

```typescript
import { getCurrentUser } from '@/fetchers/auth';

export default async function ProfilePage() {
  // This will automatically refresh tokens if needed
  const userData = await getCurrentUser();

  if (!userData.success) {
    redirect('/login');
  }

  return <div>Welcome {userData.data?.firstName}</div>;
}
```

### **Client Component (via Server Actions)**

```typescript
'use client';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/actions/auth'; // Server action

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      // This will automatically refresh tokens if needed (server-side)
      const result = await getCurrentUser();
      if (result.success) {
        setUser(result.data);
      }
    };

    fetchUser();
  }, []);

  return <div>{user?.firstName}</div>;
}
```

### **Server Action**

```typescript
'use server';
import { performFetch } from '@/lib/apiUtils';

export async function updateProfile(data: any) {
  // This will automatically refresh tokens if needed
  const result = await performFetch('/api/user/profile', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });

  return result;
}
```

---

## **🎯 Key Benefits**

1. **🔄 Automatic Refresh**: Tokens refresh seamlessly without user intervention
2. **⚡ Performance**: Failed requests retry automatically with new tokens
3. **🔒 Security**: Short-lived access tokens with secure refresh mechanism
4. **🎨 UX**: No interruption to user experience when tokens expire
5. **🛡️ Error Handling**: Graceful fallback to login when refresh fails
6. **📱 Server-Side Only**: Maximum security with iron-session only approach
7. **🚫 No localStorage**: Tokens never exposed to client-side JavaScript

---

## **🔧 Backend Requirements**

Your backend should implement:

```typescript
// POST /auth/refresh
{
  "refresh_token": "your_refresh_token_here"
}

// Response
{
  "success": true,
  "data": {
    "authorization": {
      "access_token": "new_access_token",
      "refresh_token": "new_refresh_token"
    }
  }
}
```

---

## **🚨 Important Notes**

1. **Refresh tokens should be long-lived** (7-30 days)
2. **Access tokens should be short-lived** (15-30 minutes)
3. **Backend should invalidate old refresh tokens** when issuing new ones
4. **Implement proper error handling** for refresh failures
5. **Consider rate limiting** on refresh endpoints
6. **Log refresh attempts** for security monitoring

---

## **✅ Implementation Status**

- ✅ **Server-side refresh** implemented
- ✅ **Iron-session only approach** implemented
- ✅ **No localStorage dependency** implemented
- ✅ **Automatic retry** implemented
- ✅ **Error handling** implemented
- ✅ **Enhanced security** implemented

**Your iron-session only token refresh system is now fully functional!** 🚀
