import { BASE_URL } from '@/config/env';

export const ADMIN_ENDPOINTS = {
  GET_ADMIN_USERS: `${BASE_URL}/admin/users`,
  GET_ADMIN_PRODUCTS: `${BASE_URL}/admin/products`,
  GET_ADMIN_CATEGORIES: `${BASE_URL}/admin/product-category`,
  GET_ADMIN_ORDERS: `${BASE_URL}/admin/orders`,
  GET_ADMIN_PAYMENTS: `${BASE_URL}/admin/payments`,
  UPDATE_ORDER_STATUS: (orderId: string) => `${BASE_URL}/admin/orders/${orderId}/status`,
  UPDATE_PAYMENT_STATUS: (paymentId: string) => `${BASE_URL}/admin/payments/${paymentId}/status`,
  GET_ADMIN_STATS: `${BASE_URL}/admin/stats`,
  EXPORT_ORDERS: `${BASE_URL}/admin/orders/export`,
  EXPORT_USERS: `${BASE_URL}/admin/users/export`,
};
