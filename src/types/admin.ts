import { Pagination } from './common';
import { Category, Product } from './products';

export interface AdminPledge {
  id: string;
  // Add pledge-specific fields as needed
}

export interface ProductRow {
  rows: Product[];
  count: number;
}

export interface CategoryRow {
  categories: Category[];
  pagination: Pagination;
}

export interface AdminStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  averageOrderValue: number;
}
