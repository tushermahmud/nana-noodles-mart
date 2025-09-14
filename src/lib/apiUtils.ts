import { getSession } from "@/actions/auth.actions";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type CustomFetchResponse<T> = {
	isSuccess: boolean;
	statusCode: number;
	message: string;
	errorCode: string | null;
	data: T | null;
	errorDetails?: string;
};

interface RequestOptions {
	method: HttpMethod;
	body?: string | object | FormData | null;
	additionalHeaders?: Record<string, string>;
	includeAuthorization?: boolean;
	next?: NextFetchRequestConfig;
	cache?: RequestCache;
	signal?: AbortSignal | null;
}

export async function performFetch<T>(
	url: string,
	options: RequestOptions
): Promise<CustomFetchResponse<T>> {
	const {
		method,
		body,
		additionalHeaders,
		includeAuthorization = true,
		next,
		cache,
		signal = AbortSignal.timeout(60000),
	} = options;

	const headers: Record<string, string> = {
		...additionalHeaders,
	};

	const session = await getSession();

	if (includeAuthorization && session?.accessToken) {
		headers["Authorization"] = `Bearer ${session?.accessToken}`;
	}

	const requestOptions: RequestInit = {
		method,
		headers,
		signal,
	};

	if (next) {
		requestOptions.next = next;
	}

	if (cache) {
		requestOptions.cache = cache;
	}

	if (["POST", "PUT", "PATCH"].includes(method)) {
		if (body instanceof FormData) {
			requestOptions.body = body;
		} else if (body) {
			requestOptions.body = JSON.stringify(body);
			headers["Content-Type"] = "application/json";
		}
	}

	try {
		const response = await fetch(url, requestOptions);
		const contentType = response.headers.get("content-type");
		let data;

		if (contentType && contentType.includes("application/json")) {
			try {
				data = await response.json();
			} catch (jsonError) {
				const textData = await response.text();
				console.error(`🚨 JSON parsing failed for ${url}:`, jsonError);
				return {
					isSuccess: false,
					statusCode: response.status,
					message: "Invalid JSON response from server",
					errorCode: "INVALID_JSON",
					data: null,
					errorDetails: textData,
				};
			}
		} else {
			const textData = await response.text();
			console.error(
				`🚨 Non-JSON response from ${url}. Content-Type: ${contentType}`
			);
			return {
				isSuccess: false,
				statusCode: response.status,
				message: "Server returned non-JSON response",
				errorCode: "NON_JSON_RESPONSE",
				data: null,
				errorDetails: textData,
			};
		}

		if (!response.ok) {
			// eslint-disable-next-line no-console
			console.log(`🚨responseNotOk:url(${url})`, {
				requestOptions,
				response,
				data,
			});
			return {
				isSuccess: false,
				statusCode: response.status,
				message: data.msg || "Ocorreu um erro",
				errorCode: data.code || null,
				data: data || null,
				errorDetails: JSON.stringify(data),
			};
		}
		
		return {
			isSuccess: true,
			statusCode: response.status,
			message: "Success",
			errorCode: null,
			data: data as T,
		};
	} catch (error) {
		// eslint-disable-next-line no-console
		return {
			isSuccess: false,
			statusCode: 500,
			message:
				error instanceof Error ? error.message : "Ocorreu um erro desconhecido",
			errorCode: null,
			data: null,
			errorDetails: error instanceof Error ? error.stack : undefined,
		};
	}
}
