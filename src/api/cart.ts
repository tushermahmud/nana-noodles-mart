import { BASE_URL } from '@/config/env';

export const CART_ENDPOINTS = {
  GET_CART: `${BASE_URL}/cart`,
  ADD_TO_CART: `${BASE_URL}/cart/items`,
  UPDATE_CART_ITEM: (itemId: string) => `${BASE_URL}/cart/items/${itemId}`,
  REMOVE_FROM_CART: (itemId: string) => `${BASE_URL}/cart/items/${itemId}`,
  CLEAR_CART: `${BASE_URL}/cart`,
  GET_CART_COUNT: `${BASE_URL}/cart/count`,
  APPLY_DISCOUNT: `${BASE_URL}/cart/discount`,
  REMOVE_DISCOUNT: `${BASE_URL}/cart/discount`,
  MERGE_GUEST_CART: `${BASE_URL}/cart/merge`,
  SAVE_FOR_LATER: `${BASE_URL}/cart/save-for-later`,
  GET_SAVED_ITEMS: `${BASE_URL}/cart/saved`,
  MOVE_TO_CART: `${BASE_URL}/cart/move-to-cart`,
};
