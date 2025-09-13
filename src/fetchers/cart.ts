import { CART_ENDPOINTS } from '@/api/cart';
import { Cart } from '@/types/cart';
import { Product } from '@/types/products';
import { APIResponse } from '@/types/common';
import { performFetch } from '@/lib/apiUtils';

export async function getCart() {
  const res = await performFetch<Cart>(CART_ENDPOINTS.GET_CART, {
    method: 'GET',
    next: {
      tags: ['getCart'],
    },
  });

  return res;
}

export async function getCartItemCount() {
  const res = await performFetch<{ count: number }>(CART_ENDPOINTS.GET_CART_COUNT, {
    method: 'GET',
    next: {
      tags: ['getCartCount'],
    },
  });

  return res;
}

export async function getSavedItems() {
  const res = await performFetch<Product[]>(CART_ENDPOINTS.GET_SAVED_ITEMS, {
    method: 'GET',
    next: {
      tags: ['getSavedItems'],
    },
  });

  return res;
}
