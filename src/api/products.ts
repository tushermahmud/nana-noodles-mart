import { BASE_URL } from '@/config/env';

export const PRODUCTS_ENDPOINTS = {
  GET_PRODUCTS: `${BASE_URL}/products`,
  GET_ALL_PRODUCTS: `${BASE_URL}/product-page`,
  GET_PRODUCT: (id: string) => `${BASE_URL}/products/${id}`,
  SEARCH_PRODUCTS: `${BASE_URL}/products/search`,
  GET_FEATURED_PRODUCTS: `${BASE_URL}/products/featured`,
  GET_RELATED_PRODUCTS: (productId: string) => `${BASE_URL}/products/${productId}/related`,
  CREATE_PRODUCT: `${BASE_URL}/admin/products/add-product`,
  UPDATE_PRODUCT: (id: string) => `${BASE_URL}/admin/products/${id}`,
  DELETE_PRODUCT: (id: string) => `${BASE_URL}/admin/products/${id}`,
  UPLOAD_PRODUCT_IMAGE: (productId: string) => `${BASE_URL}/products/${productId}/image`,
};

export const CATEGORIES_ENDPOINTS = {
  GET_CATEGORIES: `${BASE_URL}/admin/product-category`,
  GET_CATEGORY: (id: string) => `${BASE_URL}/categories/${id}`,
  GET_CATEGORY_BY_SLUG: (slug: string) => `${BASE_URL}/categories/slug/${slug}`,
  GET_ACTIVE_CATEGORIES: `${BASE_URL}/categories/active`,
  GET_PRODUCTS_BY_CATEGORY: (categoryId: string) => `${BASE_URL}/categories/${categoryId}/products`,
  CREATE_CATEGORY: `${BASE_URL}/admin/product-category`,
  UPDATE_CATEGORY: (id: string) => `${BASE_URL}/admin/product-category/${id}`,
  DELETE_CATEGORY: (id: string) => `${BASE_URL}/admin/product-category/${id}`,
  UPLOAD_CATEGORY_IMAGE: (categoryId: string) => `${BASE_URL}/categories/${categoryId}/image`,
};
