export interface APIResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface PaginatedAPIResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
