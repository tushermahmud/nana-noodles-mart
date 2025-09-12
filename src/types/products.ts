import { BaseEntity } from './common';

export interface Product extends BaseEntity {
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  category?: Category;
  isAvailable: boolean;
  stock: number;
  popular: boolean;
  tags?: string[];
  imageUrl: string;
  spice_level: number;
  features: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  imageUrl: string;
  icon?: string;
  color?: string;
  features?: string[];
  products?: Product[];
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  tags?: string[];
  isAvailable?: boolean;
}

export interface SearchParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  filters?: ProductFilters;
}
