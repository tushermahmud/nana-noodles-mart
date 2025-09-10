"use server";

import { revalidateTag } from "next/cache";
import { AUTH_ENDPOINTS } from "@/api/auth";
import { LoginResponse, LoginRequest, RegisterRequest, RegisterResponse, User } from "@/types/auth";
import { performFetch } from "@/lib/apiUtils";

export async function loginUser(data: LoginRequest) {
	const res = await performFetch<LoginResponse>(AUTH_ENDPOINTS.LOGIN, {
		method: "POST",
		body: JSON.stringify(data),
	});
	
	if (res && res?.success) {
		revalidateTag("getCurrentUser");
	}
	
	return res;
}

export async function registerUser(data: RegisterRequest) {
	const res = await performFetch<RegisterResponse>(AUTH_ENDPOINTS.REGISTER, {
		method: "POST",
		body: JSON.stringify(data),
	});	
	if (res && res?.success) {
		revalidateTag("getCurrentUser");
	}
	
	return res;
}

export async function logoutUser() {
	const res = await performFetch<void>(AUTH_ENDPOINTS.LOGOUT, {
		method: "POST",
	});
	
	if (res.success) {
		revalidateTag("getCurrentUser");
	}
	
	return res;
}

export async function updateUserProfile(data: Partial<User>) {
	const res = await performFetch<User>(AUTH_ENDPOINTS.UPDATE_PROFILE, {
		method: "PATCH",
		body: data,
	});
	
	if (res.success) {
		revalidateTag("getCurrentUser");
	}
	
	return res;
}

export async function changePassword(data: {
	currentPassword: string;
	newPassword: string;
}) {
	const res = await performFetch<void>(AUTH_ENDPOINTS.CHANGE_PASSWORD, {
		method: "POST",
		body: data,
	});
	
	return res;
}

export async function requestPasswordReset(email: string) {
	const res = await performFetch<void>(AUTH_ENDPOINTS.FORGOT_PASSWORD, {
		method: "POST",
		body: { email },
	});
	
	return res;
}

export async function resetPassword(data: {
	token: string;
	newPassword: string;
}) {
	const res = await performFetch<void>(AUTH_ENDPOINTS.RESET_PASSWORD, {
		method: "POST",
		body: data,
	});
	
	return res;
}

export async function verifyEmail(token: string) {
	const res = await performFetch<void>(AUTH_ENDPOINTS.VERIFY_EMAIL, {
		method: "POST",
		body: { token },
	});
	
	if (res.success) {
		revalidateTag("getCurrentUser");
	}
	
	return res;
}

export async function resendVerificationEmail() {
	const res = await performFetch<void>(AUTH_ENDPOINTS.RESEND_VERIFICATION, {
		method: "POST",
	});
	
	return res;
}
