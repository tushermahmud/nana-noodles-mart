import { CART_ENDPOINTS } from '@/api/cart';
import { Cart } from '@/types/cart';
import { Product } from '@/types/products';
import { APIResponse } from '@/types/common';
import { performFetch } from '@/lib/apiUtils';

export async function getCart(cartId: string) {
  const res = await performFetch<APIResponse<Cart>>(CART_ENDPOINTS.GET_CART(cartId), {
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

export async function addToCart(payload: { productId: string; quantity: number }) {
  const res = await performFetch<APIResponse<Cart>>(CART_ENDPOINTS.ADD_TO_CART(payload.productId), {
    method: 'POST',
    body: payload,
  });
  return res;
}

export async function updateCartItem(itemId: string, quantity: number) {
  const res = await performFetch<Cart>(CART_ENDPOINTS.UPDATE_CART_ITEM(itemId), {
    method: 'PATCH',
    body: { quantity },
  });
  return res;
}

export async function clearCart() {
  const res = await performFetch<Cart>(`${CART_ENDPOINTS.GET_CART}/clear`, {
    method: 'POST',
  });
  return res;
}
