'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { performFetch } from '@/lib/apiUtils';
import { APIResponse } from '@/types/common';
import { Product } from '@/types/products';
import { PRODUCTS_ENDPOINTS } from '@/api/products';
import { Order } from '@/types/orders';

export async function createProduct(productData: FormData) {
  const res = await performFetch<APIResponse<Product>>(PRODUCTS_ENDPOINTS.CREATE_PRODUCT, {
    method: 'POST',
    body: productData,
  });

  if (res?.isSuccess) {
    revalidateTag('getAdminProducts');
  }
  return res;
}

export async function updateProduct(id: string, productData: FormData) {
  const res = await performFetch<APIResponse<Product>>(PRODUCTS_ENDPOINTS.UPDATE_PRODUCT(id), {
    method: 'PATCH',
    body: productData,
  });

  if (res?.isSuccess) {
    revalidateTag('getAdminProducts');
  }

  return res;
}

export async function deleteProduct(id: string) {
  const res = await performFetch<APIResponse<null>>(PRODUCTS_ENDPOINTS.DELETE_PRODUCT(id), {
    method: 'DELETE',
  });

  if (res?.isSuccess) {
    revalidateTag('getAdminProducts');
  }

  return res;
}

export async function userDashboardOrders() {
  const res = await performFetch<APIResponse<Order[]>>(PRODUCTS_ENDPOINTS.USER_DASHBOARD_ORDERS, {
    method: 'GET',
  });

  return res;
}
