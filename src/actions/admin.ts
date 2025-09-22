'use server';

import { revalidateTag, revalidatePath } from 'next/cache';
import { APIResponse } from '@/types/common';
import { performFetch } from '@/lib/apiUtils';
import { CATEGORIES_ENDPOINTS } from '@/api/products';
import { Category } from '@/types/products';
import { ADMIN_ENDPOINTS } from '@/api/admin';

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

export async function updateOrderStatus(orderId: string, delivery_status: string) {
  const res = await performFetch<APIResponse>(ADMIN_ENDPOINTS.UPDATE_ORDER_STATUS(orderId), {
    method: 'PATCH',
    body: { delivery_status },
  });

  if (res?.isSuccess) {
    revalidateTag('getAdminOrders');
  }

  return res;
}
