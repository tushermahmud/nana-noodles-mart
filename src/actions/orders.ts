'use server';

import { revalidateTag } from 'next/cache';
import { ORDERS_ENDPOINTS } from '@/api/orders';
import { APIResponse } from '@/types/common';
import { Order } from '@/types/orders';
import { performFetch } from '@/lib/apiUtils';

export async function createOrder(data: {
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  discountCode?: string;
}) {
  const res = await performFetch<Order>(ORDERS_ENDPOINTS.CREATE_ORDER, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (res?.success) {
    revalidateTag('getOrders');
    revalidateTag('getCart');
    revalidateTag('getCartCount');
  }

  return res;
}

export async function updateOrderStatus(id: string, status: Order['status']) {
  const res = await performFetch<Order>(ORDERS_ENDPOINTS.UPDATE_ORDER_STATUS(id), {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });

  if (res?.success) {
    revalidateTag('getOrders');
    revalidateTag('getOrder');
    revalidateTag('getAdminOrders');
  }

  return res;
}

export async function updatePaymentStatus(id: string, paymentStatus: Order['paymentStatus']) {
  const res = await performFetch<Order>(ORDERS_ENDPOINTS.UPDATE_PAYMENT_STATUS(id), {
    method: 'PATCH',
    body: JSON.stringify({ paymentStatus }),
  });

  if (res?.success) {
    revalidateTag('getOrders');
    revalidateTag('getOrder');
    revalidateTag('getAdminOrders');
  }

  return res;
}

export async function addTrackingNumber(id: string, trackingNumber: string) {
  const res = await performFetch<Order>(ORDERS_ENDPOINTS.ADD_TRACKING_NUMBER(id), {
    method: 'PATCH',
    body: JSON.stringify({ trackingNumber }),
  });

  if (res?.success) {
    revalidateTag('getOrders');
    revalidateTag('getOrder');
    revalidateTag('getAdminOrders');
  }

  return res;
}

export async function cancelOrder(id: string, reason?: string) {
  const res = await performFetch<Order>(ORDERS_ENDPOINTS.CANCEL_ORDER(id), {
    method: 'PATCH',
    body: JSON.stringify({ reason }),
  });

  if (res?.success) {
    revalidateTag('getOrders');
    revalidateTag('getOrder');
    revalidateTag('getAdminOrders');
  }

  return res;
}

export async function requestReturn(
  id: string,
  data: {
    items: Array<{
      orderItemId: string;
      quantity: number;
      reason: string;
    }>;
    reason: string;
  }
) {
  const res = await performFetch<{ returnId: string; status: string }>(
    ORDERS_ENDPOINTS.REQUEST_RETURN(id),
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );

  if (res?.success) {
    revalidateTag('getOrders');
    revalidateTag('getOrder');
  }

  return res;
}

export async function exportOrders(filters?: {
  startDate?: string;
  endDate?: string;
  status?: Order['status'];
}) {
  const res = await performFetch<{ downloadUrl: string }>(ORDERS_ENDPOINTS.EXPORT_ORDERS, {
    method: 'POST',
    body: JSON.stringify(filters),
  });

  return res;
}
