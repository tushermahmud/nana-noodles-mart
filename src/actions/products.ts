'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { performFetch } from '@/lib/apiUtils';
import { APIResponse } from '@/types/common';
import { Product } from '@/types/products';
import { PRODUCTS_ENDPOINTS } from '@/api/products';

export async function createProduct(productData: FormData) {
  try {
    const res = await performFetch<APIResponse<Product>>(PRODUCTS_ENDPOINTS.CREATE_PRODUCT, {
      method: 'POST',
      body: productData,
    });

    if (res?.isSuccess) {
      revalidateTag('getAdminProducts');
      return { success: true, data: res.data };
    }

    return { success: false, message: res?.message || 'Failed to create product' };
  } catch (error) {
    console.error('Error creating product:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create product',
    };
  }
}

export async function updateProduct(id: string, productData: FormData) {
  try {
    const res = await performFetch<APIResponse<Product>>(PRODUCTS_ENDPOINTS.UPDATE_PRODUCT(id), {
      method: 'PATCH',
      body: productData,
    });

    if (res?.isSuccess) {
      revalidateTag('getAdminProducts');
      return { success: true, data: res.data };
    }

    return { success: false, message: res?.message || 'Failed to update product' };
  } catch (error) {
    console.error('Error updating product:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update product',
    };
  }
}

export async function deleteProduct(id: string) {
  try {
    const res = await performFetch<APIResponse<null>>(PRODUCTS_ENDPOINTS.DELETE_PRODUCT(id), {
      method: 'DELETE',
    });

    if (res?.isSuccess) {
      revalidateTag('getAdminProducts');
      return { success: true };
    }

    return { success: false, message: res?.message || 'Failed to delete product' };
  } catch (error) {
    console.error('Error deleting product:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete product',
    };
  }
}
