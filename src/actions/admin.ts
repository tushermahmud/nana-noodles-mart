'use server';

import { revalidateTag } from 'next/cache';
import { ADMIN_ENDPOINTS } from '@/api/admin';
import { APIResponse } from '@/types/common';
import { AdminStats } from '@/types/admin';
import { performFetch } from '@/lib/apiUtils';

export async function updateOrderStatus(orderId: string, status: string) {
  const res = await performFetch(ADMIN_ENDPOINTS.UPDATE_ORDER_STATUS(orderId), {
    method: 'PATCH',
    body: { status },
  });

  if (res.isSuccess) {
    revalidateTag('getAdminOrders');
    revalidateTag('getOrders');
    revalidateTag('getOrder');
  }

  return res;
}

export async function updatePaymentStatus(paymentId: string, status: string) {
  const res = await performFetch(ADMIN_ENDPOINTS.UPDATE_PAYMENT_STATUS(paymentId), {
    method: 'PATCH',
    body: { status },
  });

  if (res.isSuccess) {
    revalidateTag('getAdminPayments');
    revalidateTag('getPaymentHistory');
    revalidateTag('getPaymentDetails');
  }

  return res;
}

export async function exportOrders(filters?: {
  startDate?: string;
  endDate?: string;
  status?: string;
}) {
  const res = await performFetch<{ downloadUrl: string }>(ADMIN_ENDPOINTS.EXPORT_ORDERS, {
    method: 'POST',
    body: filters,
  });

  return res;
}

export async function exportUsers(filters?: {
  startDate?: string;
  endDate?: string;
  role?: string;
}) {
  const res = await performFetch<{ downloadUrl: string }>(ADMIN_ENDPOINTS.EXPORT_USERS, {
    method: 'POST',
    body: filters,
  });

  return res;
}
