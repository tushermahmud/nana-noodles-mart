import { BASE_URL } from "@/config/env";

export const PAYMENTS_ENDPOINTS = {
	CREATE_PAYMENT_INTENT: `${BASE_URL}/payments/create-intent`,
	CONFIRM_PAYMENT: `${BASE_URL}/payments/confirm`,
	PROCESS_REFUND: `${BASE_URL}/payments/refund`,
	GET_PAYMENT_METHODS: `${BASE_URL}/payments/methods`,
	ADD_PAYMENT_METHOD: `${BASE_URL}/payments/methods`,
	REMOVE_PAYMENT_METHOD: (methodId: string) => `${BASE_URL}/payments/methods/${methodId}`,
	SET_DEFAULT_PAYMENT_METHOD: (methodId: string) => `${BASE_URL}/payments/methods/${methodId}`,
	GET_PAYMENT_HISTORY: `${BASE_URL}/payments/history`,
	GET_PAYMENT_DETAILS: (paymentId: string) => `${BASE_URL}/payments/${paymentId}`,
	CREATE_SETUP_INTENT: `${BASE_URL}/payments/setup-intent`,
	VALIDATE_COUPON: `${BASE_URL}/payments/validate-coupon`,
};
