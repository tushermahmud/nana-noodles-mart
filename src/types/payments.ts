export interface PaymentIntent {
	clientSecret: string;
	amount: number;
	currency: string;
}

export interface PaymentMethod {
	id: string;
	type: string;
	last4?: string;
	brand?: string;
	expiryMonth?: number;
	expiryYear?: number;
	isDefault: boolean;
}

export interface PaymentHistory {
	id: string;
	amount: number;
	currency: string;
	status: string;
	description: string;
	createdAt: string;
	orderId?: string;
}

export interface PaymentDetails extends PaymentHistory {
	refunds?: Array<{
		id: string;
		amount: number;
		status: string;
		createdAt: string;
	}>;
}
