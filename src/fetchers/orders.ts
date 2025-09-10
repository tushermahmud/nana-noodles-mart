import { ORDERS_ENDPOINTS } from "@/api/orders";
import { Order } from "@/types/orders";
import { PaginatedAPIResponse, PaginationParams } from "@/types/common";
import { performFetch } from "@/lib/apiUtils";
import { getQueryEndpoint } from "@/lib/utils";

export async function getOrders(params?: PaginationParams) {
	const res = await performFetch<PaginatedAPIResponse<Order>>(
		getQueryEndpoint(ORDERS_ENDPOINTS.GET_ORDERS, params || {}),
		{
			method: "GET",
			next: {
				tags: ["getOrders"],
			},
		}
	);

	return res;
}

export async function getOrder(id: string) {
	const res = await performFetch<Order>(ORDERS_ENDPOINTS.GET_ORDER(id), {
		method: "GET",
		next: {
			tags: ["getOrder", `getOrder-${id}`],
		},
	});

	return res;
}

export async function getOrderTracking(id: string) {
	const res = await performFetch<{
		trackingNumber: string;
		status: string;
		estimatedDelivery: string;
		trackingHistory: Array<{
			status: string;
			location: string;
			timestamp: string;
			description: string;
		}>;
	}>(ORDERS_ENDPOINTS.GET_ORDER_TRACKING(id), {
		method: "GET",
		next: {
			tags: ["getOrderTracking", `getOrderTracking-${id}`],
		},
	});

	return res;
}

export async function getOrderStats() {
	const res = await performFetch<{
		totalOrders: number;
		totalRevenue: number;
		pendingOrders: number;
		completedOrders: number;
		cancelledOrders: number;
		averageOrderValue: number;
	}>(ORDERS_ENDPOINTS.GET_ORDER_STATS, {
		method: "GET",
		next: {
			tags: ["getOrderStats"],
		},
	});

	return res;
}

export async function getOrdersByStatus(status: Order['status'], params?: PaginationParams) {
	const res = await performFetch<PaginatedAPIResponse<Order>>(
		getQueryEndpoint(ORDERS_ENDPOINTS.GET_ORDERS_BY_STATUS(status), params || {}),
		{
			method: "GET",
			next: {
				tags: ["getOrdersByStatus", `getOrdersByStatus-${status}`],
			},
		}
	);

	return res;
}
