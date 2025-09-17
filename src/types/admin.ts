import { Pagination } from './common';
import { Category, Product } from './products';

export interface AdminPledge {
  id: string;
  // Add pledge-specific fields as needed
}

export interface ProductRow {
  row: Product[];
  count: number;
}

export interface CategoryRow {
  categories: Category[];
  pagination: Pagination;
}

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
}
