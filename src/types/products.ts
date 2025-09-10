import { BaseEntity } from "./common";

export interface Product extends BaseEntity {
	name: string;
	description: string;
	price: number;
	image: string;
	categoryId: string;
	category?: Category;
	isAvailable: boolean;
	stock: number;
	tags?: string[];
}

export interface Category extends BaseEntity {
	name: string;
	description: string;
	image: string;
	slug: string;
	isActive: boolean;
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
