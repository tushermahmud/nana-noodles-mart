import { PAYMENTS_ENDPOINTS } from "@/api/payments";
import { PaymentMethod, PaymentDetails } from "@/types/payments";
import { PaginatedAPIResponse, PaginationParams } from "@/types/common";
import { performFetch } from "@/lib/apiUtils";
import { getQueryEndpoint } from "@/lib/utils";

export async function getPaymentMethods() {
	const res = await performFetch<PaymentMethod[]>(PAYMENTS_ENDPOINTS.GET_PAYMENT_METHODS, {
		method: "GET",
		next: {
			tags: ["getPaymentMethods"],
		},
	});

	return res;
}

export async function getPaymentHistory(params?: PaginationParams & {
	startDate?: string;
	endDate?: string;
}) {
	const res = await performFetch<PaginatedAPIResponse<PaymentDetails>>(
		getQueryEndpoint(PAYMENTS_ENDPOINTS.GET_PAYMENT_HISTORY, params || {}),
		{
			method: "GET",
			next: {
				tags: ["getPaymentHistory"],
			},
		}
	);

	return res;
}

export async function getPaymentDetails(paymentId: string) {
	const res = await performFetch<PaymentDetails>(PAYMENTS_ENDPOINTS.GET_PAYMENT_DETAILS(paymentId), {
		method: "GET",
		next: {
			tags: ["getPaymentDetails", `getPaymentDetails-${paymentId}`],
		},
	});

	return res;
}
