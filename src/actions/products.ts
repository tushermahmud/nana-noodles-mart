"use server";

import { revalidateTag } from "next/cache";
import { PRODUCTS_ENDPOINTS, CATEGORIES_ENDPOINTS } from "@/api/products";
import { APIResponse } from "@/types/common";
import { Product, Category } from "@/types/products";
import { performFetch } from "@/lib/apiUtils";

// Product Actions
export async function createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
	const res = await performFetch<Product>(PRODUCTS_ENDPOINTS.CREATE_PRODUCT, {
		method: "POST",
		body: data,
	});
	
	if (res.isSuccess) {
		revalidateTag("getProducts");
		revalidateTag("getAdminProducts");
	}
	
	return res;
}

export async function updateProduct(id: string, data: Partial<Product>) {
	const res = await performFetch<Product>(PRODUCTS_ENDPOINTS.UPDATE_PRODUCT(id), {
		method: "PATCH",
		body: data,
	});
	
	if (res.isSuccess) {
		revalidateTag("getProducts");
		revalidateTag("getProduct");
		revalidateTag("getAdminProducts");
	}
	
	return res;
}

export async function deleteProduct(id: string) {
	const res = await performFetch<void>(PRODUCTS_ENDPOINTS.DELETE_PRODUCT(id), {
		method: "DELETE",
	});
	
	if (res.isSuccess) {
		revalidateTag("getProducts");
		revalidateTag("getAdminProducts");
	}
	
	return res;
}

export async function uploadProductImage(productId: string, file: File) {
	const formData = new FormData();
	formData.append('file', file);
	
	const res = await performFetch<{ imageUrl: string }>(PRODUCTS_ENDPOINTS.UPLOAD_PRODUCT_IMAGE(productId), {
		method: "POST",
		body: formData,
		headers: {
			// Don't set Content-Type for FormData, let browser set it
		},
	});
	
	if (res.isSuccess) {
		revalidateTag("getProduct");
		revalidateTag("getProducts");
	}
	
	return res;
}

// Category Actions
export async function createCategory(data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) {
	const res = await performFetch<Category>(CATEGORIES_ENDPOINTS.CREATE_CATEGORY, {
		method: "POST",
		body: data,
	});
	
	if (res.isSuccess) {
		revalidateTag("getCategories");
		revalidateTag("getActiveCategories");
		revalidateTag("getAdminCategories");
	}
	
	return res;
}

export async function updateCategory(id: string, data: Partial<Category>) {
	const res = await performFetch<Category>(CATEGORIES_ENDPOINTS.UPDATE_CATEGORY(id), {
		method: "PATCH",
		body: data,
	});
	
	if (res.isSuccess) {
		revalidateTag("getCategories");
		revalidateTag("getCategory");
		revalidateTag("getActiveCategories");
		revalidateTag("getAdminCategories");
	}
	
	return res;
}

export async function deleteCategory(id: string) {
	const res = await performFetch<void>(CATEGORIES_ENDPOINTS.DELETE_CATEGORY(id), {
		method: "DELETE",
	});
	
	if (res.isSuccess) {
		revalidateTag("getCategories");
		revalidateTag("getActiveCategories");
		revalidateTag("getAdminCategories");
	}
	
	return res;
}

export async function uploadCategoryImage(categoryId: string, file: File) {
	const formData = new FormData();
	formData.append('file', file);
	
	const res = await performFetch<{ imageUrl: string }>(CATEGORIES_ENDPOINTS.UPLOAD_CATEGORY_IMAGE(categoryId), {
		method: "POST",
		body: formData,
		headers: {
			// Don't set Content-Type for FormData, let browser set it
		},
	});
	
	if (res.isSuccess) {
		revalidateTag("getCategory");
		revalidateTag("getCategories");
	}
	
	return res;
}
