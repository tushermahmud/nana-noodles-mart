'use server';

import { revalidateTag, revalidatePath } from 'next/cache';
import { APIResponse } from '@/types/common';
import { performFetch } from '@/lib/apiUtils';
import { CATEGORIES_ENDPOINTS } from '@/api/products';
import { Category } from '@/types/products';

export async function createCategory(data: FormData) {
  const res = await performFetch<APIResponse<Category>>(CATEGORIES_ENDPOINTS.CREATE_CATEGORY, {
    method: 'POST',
    body: data,
  });

  if (res && res?.isSuccess) {
    revalidateTag('getAdminCategories');
  }

  return res;
}

export async function updateCategory(id: string, data: FormData) {
  const res = await performFetch<APIResponse<Category>>(CATEGORIES_ENDPOINTS.UPDATE_CATEGORY(id), {
    method: 'PATCH',
    body: data,
  });
  if (res && res?.isSuccess) {
    revalidateTag('getAdminCategories');
  }

  return res;
}

export async function deleteCategory(id: string) {
  const res = await performFetch<APIResponse>(CATEGORIES_ENDPOINTS.DELETE_CATEGORY(id), {
    method: 'DELETE',
  });

  if (res?.isSuccess) {
    revalidateTag('getAdminCategories');
  }

  return res;
}


/* export async function updatePaymentStatus(paymentId: string, status: string) {
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
} */

/* export async function exportOrders(filters?: {
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
} */
