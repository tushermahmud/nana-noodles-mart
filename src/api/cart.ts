import { BASE_URL } from '@/config/env';

export const CART_ENDPOINTS = {
  GET_CART: (cartId: string) => `${BASE_URL}/cart/${cartId}`,
  ADD_TO_CART: (cartId: string) => `${BASE_URL}/cart/${cartId}`,
  UPDATE_CART_ITEM: (cartId: string) => `${BASE_URL}/cart/${cartId}`,
  REMOVE_FROM_CART: (product_id: string, cartId: string) =>
    `${BASE_URL}/cart/${cartId}/${product_id}`,
  CLEAR_CART: `${BASE_URL}/cart`,
  GET_CART_COUNT: `${BASE_URL}/cart/count`,
  APPLY_DISCOUNT: `${BASE_URL}/cart/discount`,
  REMOVE_DISCOUNT: `${BASE_URL}/cart/discount`,
  MERGE_GUEST_CART: `${BASE_URL}/cart/merge`,
  SAVE_FOR_LATER: `${BASE_URL}/cart/save-for-later`,
  GET_SAVED_ITEMS: `${BASE_URL}/cart/saved`,
  MOVE_TO_CART: `${BASE_URL}/cart/move-to-cart`,
};
