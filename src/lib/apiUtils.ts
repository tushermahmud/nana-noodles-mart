import { APIResponse } from "@/types/common";

interface FetchOptions extends RequestInit {
	next?: {
		tags?: string[];
		revalidate?: number;
	};
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
	const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	// Set default headers
	headers['Content-Type'] = headers['Content-Type'] || 'application/json';

	// Normalize body: JSON.stringify plain objects
	let normalizedBody: BodyInit | undefined;
	if (body instanceof FormData || body instanceof Blob || typeof body === 'string') {
		normalizedBody = body as BodyInit;
	} else if (body !== undefined && body !== null) {
		normalizedBody = JSON.stringify(body);
		headers['Content-Type'] = headers['Content-Type'] || 'application/json';
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
				message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
				data: null,
			};
		}

		const data = await response.json();
		return {
			success: data.success,
			message: data.message || 'Success',
			data: data.data || data,
		};
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : 'Network error',
			data: null,
		};
	}
}
