'use client';

import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import {
  addToCart as addToCartAction,
  updateCartItem as updateCartItemAction,
  clearCart as clearCartAction,
} from '@/actions/cart';
import { getCart as getCartAction } from '@/fetchers/cart';
import { removeCartItem as removeFromCartAction } from '@/actions/cart';
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'SET_CART'; payload: CartState }
  | { type: 'OPTIMISTIC_ADD'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'OPTIMISTIC_REMOVE'; payload: string }
  | { type: 'OPTIMISTIC_UPDATE'; payload: { id: string; quantity: number } }
  | { type: 'RESET' };

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

function recalc(items: CartItem[]): CartState {
  const total = items.reduce((s, it) => s + it.price * it.quantity, 0);
  const itemCount = items.reduce((s, it) => s + it.quantity, 0);
  return { items, total, itemCount };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_CART':
      return action.payload;
    case 'OPTIMISTIC_ADD': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      const items = existing
        ? state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, { ...action.payload, quantity: 1 }];
      return recalc(items);
    }
    case 'OPTIMISTIC_REMOVE': {
      const items = state.items.filter((i) => i.id !== action.payload);
      return recalc(items);
    }
    case 'OPTIMISTIC_UPDATE': {
      const items = state.items
        .map((i) =>
          i.id === action.payload.id ? { ...i, quantity: Math.max(0, action.payload.quantity) } : i
        )
        .filter((i) => i.quantity > 0);
      return recalc(items);
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  reload: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [loading, setLoading] = useState(false);

  const loadFromServer = async () => {
    try {
      const res: any = await getCartAction('324234234');
      const data = res?.data || res?.data?.data || res; // accept multiple shapes
      const items: CartItem[] = (data?.items || []).map((it: any) => ({
        id: it.id || it.productId,
        name: it.product?.name ?? it.name,
        price: Number(it.price ?? it.product?.price ?? 0),
        image: it.product?.imageUrl ?? it.imageUrl ?? it.image,
        quantity: Number(it.quantity ?? 1),
        category: it.product?.category ?? it.category ?? '',
      }));
      dispatch({ type: 'SET_CART', payload: recalc(items) });
    } catch (e) {
      // silent; UX stays empty
    }
  };

  useEffect(() => {
    loadFromServer();
  }, []);

  const addItem = async (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'OPTIMISTIC_ADD', payload: item });
    try {
      await addToCartAction({ productId: item.id, quantity: 1 });
      await loadFromServer();
    } catch (e) {
      await loadFromServer();
    }
  };

  const removeItem = async (id: string) => {
    dispatch({ type: 'OPTIMISTIC_REMOVE', payload: id });
    try {
      await removeFromCartAction(id, '324234234');
      await loadFromServer();
    } catch (e) {
      await loadFromServer();
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    dispatch({ type: 'OPTIMISTIC_UPDATE', payload: { id, quantity } });
    try {
      await updateCartItemAction(id, '324234234', quantity);
      await loadFromServer();
    } catch (e) {
      await loadFromServer();
    }
  };

  const clearCart = async () => {
    dispatch({ type: 'RESET' });
    try {
      await clearCartAction();
      await loadFromServer();
    } catch (e) {
      await loadFromServer();
    }
  };

  const reload = async () => loadFromServer();

  const value = useMemo(
    () => ({ state, addItem, removeItem, updateQuantity, clearCart, reload }),
    [state]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
