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

export interface PaymentIntentRequest {
  products: Array<{
    name: string;
    price: number;
    quantity: number;
    description: string;
    product_id: string;
  }>;
  contact_first_name: string;
  contact_last_name: string;
  contact_email: string;
  contact_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip_code: string;
  shipping_method: string;
  shipping_cost: number;
  shipping_days: string;
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

export interface PaymentTransaction {
  id: string;
  status: string;
  raw_status: string | null;
  provider: string | null;
  amount: number;
  currency: string;
  paid_amount: number | null;
  paid_currency: string | null;
  created_at: string;
  updated_at: string;
  user: {
    email: string;
  };
  order_items: Array<{
    id: string;
  }>;
}
