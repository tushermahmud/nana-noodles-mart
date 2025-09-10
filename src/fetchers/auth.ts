import { AUTH_ENDPOINTS } from "@/api/auth";
import { User } from "@/types/auth";
import { APIResponse } from "@/types/common";
import { performFetch } from "@/lib/apiUtils";

export async function getCurrentUser() {
	const res = await performFetch<User>(AUTH_ENDPOINTS.GET_CURRENT_USER, {
		method: "GET",
		next: {
			tags: ["getCurrentUser"],
		},
	});

	return res;
}

export function isAuthenticated(): boolean {
	if (typeof window === 'undefined') return false;
	return !!localStorage.getItem('authToken');
}

export function getAuthToken(): string | null {
	if (typeof window === 'undefined') return null;
	return localStorage.getItem('authToken');
}
