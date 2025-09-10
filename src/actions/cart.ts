"use server";

import { revalidateTag } from "next/cache";
import { CART_ENDPOINTS } from "@/api/cart";
import { APIResponse } from "@/types/common";
import { CartItem, Cart } from "@/types/cart";
import { Product } from "@/types/products";
import { performFetch } from "@/lib/apiUtils";

export async function addToCart(data: {
	productId: string;
	quantity: number;
}) {
	const res = await performFetch<CartItem>(CART_ENDPOINTS.ADD_TO_CART, {
		method: "POST",
		body: data,
	});
	
	if (res.isSuccess) {
		revalidateTag("getCart");
		revalidateTag("getCartCount");
	}
	
	return res;
}

export async function updateCartItem(itemId: string, quantity: number) {
	const res = await performFetch<CartItem>(CART_ENDPOINTS.UPDATE_CART_ITEM(itemId), {
		method: "PATCH",
		body: { quantity },
	});
	
	if (res.isSuccess) {
		revalidateTag("getCart");
		revalidateTag("getCartCount");
	}
	
	return res;
}

export async function removeFromCart(itemId: string) {
	const res = await performFetch<void>(CART_ENDPOINTS.REMOVE_FROM_CART(itemId), {
		method: "DELETE",
	});
	
	if (res.isSuccess) {
		revalidateTag("getCart");
		revalidateTag("getCartCount");
	}
	
	return res;
}

export async function clearCart() {
	const res = await performFetch<void>(CART_ENDPOINTS.CLEAR_CART, {
		method: "DELETE",
	});
	
	if (res.isSuccess) {
		revalidateTag("getCart");
		revalidateTag("getCartCount");
	}
	
	return res;
}

export async function applyDiscountCode(code: string) {
	const res = await performFetch<{
		discount: number;
		total: number;
		message: string;
	}>(CART_ENDPOINTS.APPLY_DISCOUNT, {
		method: "POST",
		body: { code },
	});
	
	if (res.isSuccess) {
		revalidateTag("getCart");
	}
	
	return res;
}

export async function removeDiscountCode() {
	const res = await performFetch<void>(CART_ENDPOINTS.REMOVE_DISCOUNT, {
		method: "DELETE",
	});
	
	if (res.isSuccess) {
		revalidateTag("getCart");
	}
	
	return res;
}

export async function mergeGuestCart(guestCartItems: Array<{
	productId: string;
	quantity: number;
}>) {
	const res = await performFetch<Cart>(CART_ENDPOINTS.MERGE_GUEST_CART, {
		method: "POST",
		body: { items: guestCartItems },
	});
	
	if (res.isSuccess) {
		revalidateTag("getCart");
		revalidateTag("getCartCount");
	}
	
	return res;
}

export async function saveForLater(itemId: string) {
	const res = await performFetch<void>(CART_ENDPOINTS.SAVE_FOR_LATER, {
		method: "POST",
		body: { itemId },
	});
	
	if (res.isSuccess) {
		revalidateTag("getCart");
		revalidateTag("getSavedItems");
		revalidateTag("getCartCount");
	}
	
	return res;
}

export async function moveToCart(itemId: string) {
	const res = await performFetch<CartItem>(CART_ENDPOINTS.MOVE_TO_CART, {
		method: "POST",
		body: { itemId },
	});
	
	if (res.isSuccess) {
		revalidateTag("getCart");
		revalidateTag("getSavedItems");
		revalidateTag("getCartCount");
	}
	
	return res;
}
