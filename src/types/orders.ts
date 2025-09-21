import { BaseEntity } from './common';
import { Product } from './products';
import { User } from './auth';

// Backend API response structure

export interface OrderDetailsResponse {
  rows: OrderDetails[];
  count: number;
}

export interface OrderDetails {
  order_id: string;
  delivery_status: string;
  customer_name: string;
  customer_email: string;
  items: OrderItemDetails[];
  total_price: number;
  status: string;
  created_at: string;
  created_at_full: string;
  transaction_details: TransactionDetails;
}

export interface OrderItemDetails {
  id: string;
  product_name: string;
  product_id: string;
  product: {
    id: string;
    name: string;
  };
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface TransactionDetails {
  amount: number;
  currency: string;
  reference_number: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip_code: string;
}

// Legacy types (keeping for backward compatibility)
export interface Order extends BaseEntity {
  userId: string;
  user?: User;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  trackingNumber?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
