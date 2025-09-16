export interface APIResponse<T = any> {
  isSuccess: boolean;
  statusCode: number;
  message: string;
  errorCode: string | null;
  data: T | null;
  errorDetails?: string;
}

export type PaginatedAPIResponse<T> = APIResponse<{
  rows: T[];
  count: number;
}>;

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  q?: string;
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
