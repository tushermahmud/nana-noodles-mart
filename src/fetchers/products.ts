import { PRODUCTS_ENDPOINTS, CATEGORIES_ENDPOINTS } from '@/api/products';
import { Product, Category, SearchParams, ProductFilters } from '@/types/products';
import { APIResponse, PaginatedAPIResponse, PaginationParams } from '@/types/common';
import { performFetch } from '@/lib/apiUtils';
import { getQueryEndpoint } from '@/lib/utils';

// Product Fetchers
export async function getProducts() {
  const res = await performFetch<APIResponse<Product[]>>(PRODUCTS_ENDPOINTS.GET_PRODUCTS, {
    method: 'GET',
    next: {
      tags: ['homeProducts'],
    },
  });

  return res;
}

export async function getAllProducts(params?: PaginationParams) {
  const res = await performFetch<PaginatedAPIResponse<Product>>(
    getQueryEndpoint(PRODUCTS_ENDPOINTS.GET_ALL_PRODUCTS, params || {}),
    {
      method: 'GET',
      next: {
        tags: ['getAllProducts'],
      },
    }
  );
  return res?.data;
}

export async function getProduct(id: string) {
  const res = await performFetch<APIResponse<Product>>(PRODUCTS_ENDPOINTS.GET_PRODUCT(id), {
    method: 'GET',
    next: {
      tags: ['homeProduct', `homeProduct-${id}`],
    },
  });

  return res;
}

export async function getRelatedProducts(id: string) {
  const res = await performFetch<APIResponse<Product[]>>(
    PRODUCTS_ENDPOINTS.GET_RELATED_PRODUCTS(id),
    {
      method: 'GET',
      next: {
        tags: ['relatedProducts', `relatedProducts-${id}`],
      },
    }
  );

  return res;
}

export async function searchProducts(searchTerm: string, filters?: ProductFilters) {
  const params = {
    search: searchTerm,
    ...filters,
  };

  const res = await performFetch<Product[]>(
    getQueryEndpoint(PRODUCTS_ENDPOINTS.SEARCH_PRODUCTS, params),
    {
      method: 'GET',
      next: {
        tags: ['searchProducts'],
      },
    }
  );

  return res;
}

export async function getProductsByCategory(categoryId: string, params?: PaginationParams) {
  const res = await performFetch<PaginatedAPIResponse<Product>>(
    getQueryEndpoint(CATEGORIES_ENDPOINTS.GET_PRODUCTS_BY_CATEGORY(categoryId), params || {}),
    {
      method: 'GET',
      next: {
        tags: ['getProductsByCategory', `getProductsByCategory-${categoryId}`],
      },
    }
  );

  return res;
}

export async function getFeaturedProducts(limit?: number) {
  const params = limit ? { limit } : undefined;

  const res = await performFetch<Product[]>(
    getQueryEndpoint(PRODUCTS_ENDPOINTS.GET_FEATURED_PRODUCTS, params || {}),
    {
      method: 'GET',
      next: {
        tags: ['getFeaturedProducts'],
      },
    }
  );

  return res;
}

// Category Fetchers
export async function getCategories(params?: PaginationParams) {
  const res = await performFetch<PaginatedAPIResponse<Category>>(
    getQueryEndpoint(CATEGORIES_ENDPOINTS.GET_CATEGORIES, params || {}),
    {
      method: 'GET',
      next: {
        tags: ['getCategories'],
      },
    }
  );

  return res;
}

export async function getCategory(id: string) {
  const res = await performFetch<Category>(CATEGORIES_ENDPOINTS.GET_CATEGORY(id), {
    method: 'GET',
    next: {
      tags: ['getCategory', `getCategory-${id}`],
    },
  });

  return res;
}

export async function getCategoryBySlug(slug: string) {
  const res = await performFetch<Category>(CATEGORIES_ENDPOINTS.GET_CATEGORY_BY_SLUG(slug), {
    method: 'GET',
    next: {
      tags: ['getCategoryBySlug', `getCategoryBySlug-${slug}`],
    },
  });

  return res;
}

export async function getActiveCategories() {
  const res = await performFetch<Category[]>(CATEGORIES_ENDPOINTS.GET_ACTIVE_CATEGORIES, {
    method: 'GET',
    next: {
      tags: ['getActiveCategories'],
    },
  });

  return res;
}
