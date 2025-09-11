import { APIResponse } from '@/types/common';

interface FetchOptions extends RequestInit {
  next?: {
    tags?: string[];
    revalidate?: number;
  };
}

async function getServerAccessToken(): Promise<string | null> {
  if (typeof window !== 'undefined') return null;
  try {
    const { cookies } = await import('next/headers');
    const { getIronSession } = await import('iron-session');
    const { sessionOptions } = await import('@/lib/session');
    const cookieStore = await cookies();
    const session = await getIronSession<{ accessToken?: string }>(cookieStore, sessionOptions);
    return session?.accessToken ?? null;
  } catch {
    return null;
  }
}

export async function performFetch<T>(
  url: string,
  options: FetchOptions = {}
): Promise<APIResponse<T>> {
  const {
    next,
    headers = {},
    body,
    ...fetchOptions
  } = options as FetchOptions & { headers: Record<string, any> };

  // Add auth token if available
  const clientToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  const serverToken = typeof window === 'undefined' ? await getServerAccessToken() : null;
  const token = clientToken || serverToken;
  if (token) headers['Authorization'] = `Bearer ${token}`;

  // Normalize body & set headers appropriately
  let normalizedBody: BodyInit | undefined;
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  if (isFormData) {
    normalizedBody = body as BodyInit;
    // IMPORTANT: Let the browser/node set the multipart boundary
    if ('Content-Type' in headers) delete headers['Content-Type'];
  } else if (body instanceof Blob) {
    normalizedBody = body as BodyInit;
  } else if (typeof body === 'string') {
    normalizedBody = body as BodyInit;
    // Default JSON when caller passed a string body and didn't set content type
    if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';
  } else if (body !== undefined && body !== null) {
    normalizedBody = JSON.stringify(body);
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  } else {
    // No body
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      body: normalizedBody,
      next,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: (errorData as any).message || `HTTP ${response.status}: ${response.statusText}`,
        data: null,
      };
    }

    const data = await response.json();
    return {
      success: (data as any).success,
      message: (data as any).message || 'Success',
      data: (data as any).data || data,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error',
      data: null,
    };
  }
}
