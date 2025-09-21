import { BASE_URL } from '@/config/env';

export const ORDERS_ENDPOINTS = {
  GET_ADMIN_ORDERS: `${BASE_URL}/admin/order-items`,
  GET_ORDER: (id: string) => `${BASE_URL}/orders/${id}`,
  CREATE_ORDER: `${BASE_URL}/orders`,
  UPDATE_ORDER_STATUS: (id: string) => `${BASE_URL}/orders/${id}/delivery-status`,
  UPDATE_PAYMENT_STATUS: (id: string) => `${BASE_URL}/orders/${id}/payment-status`,
  ADD_TRACKING_NUMBER: (id: string) => `${BASE_URL}/orders/${id}/tracking`,
  CANCEL_ORDER: (id: string) => `${BASE_URL}/orders/${id}/cancel`,
  REQUEST_RETURN: (id: string) => `${BASE_URL}/orders/${id}/return`,
  GET_ORDER_TRACKING: (id: string) => `${BASE_URL}/orders/${id}/tracking`,
  GET_ORDER_STATS: `${BASE_URL}/orders/stats`,
  GET_ORDERS_BY_STATUS: (status: string) => `${BASE_URL}/orders/status/${status}`,
  EXPORT_ORDERS: `${BASE_URL}/orders/export`,
};
