import { ADMIN_ENDPOINTS } from '@/api/admin';
import { ProductRow, DashboardStats } from '@/types/admin';
import { UserInfo } from '@/types/auth';
import { APIResponse, PaginatedAPIResponse, PaginationParams } from '@/types/common';
import { performFetch } from '@/lib/apiUtils';
import { getQueryEndpoint } from '@/lib/utils';
import { Category, Product } from '@/types/products';

export async function getAdminUsers(params: PaginationParams) {
  const res = await performFetch<PaginatedAPIResponse<UserInfo>>(
    getQueryEndpoint(ADMIN_ENDPOINTS.GET_ADMIN_USERS, params),
    {
      method: 'GET',
      next: {
        tags: ['getAdminUsers'],
      },
    }
  );

  return res;
}

export async function getAdminProducts(params: PaginationParams) {
  const res = await performFetch<PaginatedAPIResponse<Product>>(
    getQueryEndpoint(ADMIN_ENDPOINTS.GET_ADMIN_PRODUCTS, params),
    {
      method: 'GET',
      next: {
        tags: ['getAdminProducts'],
      },
    }
  );
  return res?.data;
}

export async function getDashboardStats() {
  const res = await performFetch<APIResponse<DashboardStats>>(ADMIN_ENDPOINTS.GET_DASHBOARD_STATS, {
    method: 'GET',
    next: {
      tags: ['getDashboardStats'],
    },
  });
  return res?.data;
}

export async function getAdminByCategories() {
  const res = await performFetch<APIResponse<Category[]>>(ADMIN_ENDPOINTS.GET_ADMIN_CATEGORIES, {
    method: 'GET',
    next: {
      tags: ['getAdminCategories'],
    },
  });
  return res?.data;
}

export async function getAdminOrders(params: PaginationParams) {
  const res = await performFetch<PaginatedAPIResponse<ProductRow>>(
    getQueryEndpoint(ADMIN_ENDPOINTS.GET_ADMIN_ORDERS, params),
    {
      method: 'GET',
      next: {
        tags: ['getAdminOrders'],
      },
    }
  );

  return res;
}

export async function getAdminPayments(params: PaginationParams) {
  const res = await performFetch<PaginatedAPIResponse<ProductRow>>(
    getQueryEndpoint(ADMIN_ENDPOINTS.GET_ADMIN_PAYMENTS, params),
    {
      method: 'GET',
      next: {
        tags: ['getAdminPayments'],
      },
    }
  );

  return res;
}

export async function getAdminStats() {
  const res = await performFetch<DashboardStats>(ADMIN_ENDPOINTS.GET_ADMIN_STATS, {
    method: 'GET',
    next: {
      tags: ['getAdminStats'],
    },
  });

  return res;
}
