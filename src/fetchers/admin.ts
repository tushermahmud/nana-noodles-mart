import { ADMIN_ENDPOINTS } from "@/api/admin";
import { AdminPledge, ProjectRow, AdminStats } from "@/types/admin";
import { UserInfo } from "@/types/auth";
import { PaginatedAPIResponse, PaginationParams } from "@/types/common";
import { performFetch } from "@/lib/apiUtils";
import { getQueryEndpoint } from "@/lib/utils";

export async function getAdminUsers(params: PaginationParams) {
	const res = await performFetch<PaginatedAPIResponse<UserInfo>>(
		getQueryEndpoint(ADMIN_ENDPOINTS.GET_ADMIN_USERS, params),
		{
			method: "GET",
			next: {
				tags: ["getAdminUsers"],
			},
		}
	);

	return res;
}

export async function getAdminProducts(params: PaginationParams) {
	const res = await performFetch<PaginatedAPIResponse<ProjectRow>>(
		getQueryEndpoint(ADMIN_ENDPOINTS.GET_ADMIN_PRODUCTS, params),
		{
			method: "GET",
			next: {
				tags: ["getAdminProducts"],
			},
		}
	);

	return res;
}

export async function getAdminCategories(params: PaginationParams) {
	const res = await performFetch<PaginatedAPIResponse<ProjectRow>>(
		getQueryEndpoint(ADMIN_ENDPOINTS.GET_ADMIN_CATEGORIES, params),
		{
			method: "GET",
			next: {
				tags: ["getAdminCategories"],
			},
		}
	);

	return res;
}

export async function getAdminOrders(params: PaginationParams) {
	const res = await performFetch<PaginatedAPIResponse<ProjectRow>>(
		getQueryEndpoint(ADMIN_ENDPOINTS.GET_ADMIN_ORDERS, params),
		{
			method: "GET",
			next: {
				tags: ["getAdminOrders"],
			},
		}
	);

	return res;
}

export async function getAdminPayments(params: PaginationParams) {
	const res = await performFetch<PaginatedAPIResponse<ProjectRow>>(
		getQueryEndpoint(ADMIN_ENDPOINTS.GET_ADMIN_PAYMENTS, params),
		{
			method: "GET",
			next: {
				tags: ["getAdminPayments"],
			},
		}
	);

	return res;
}

export async function getAdminStats() {
	const res = await performFetch<AdminStats>(ADMIN_ENDPOINTS.GET_ADMIN_STATS, {
		method: "GET",
		next: {
			tags: ["getAdminStats"],
		},
	});

	return res;
}
