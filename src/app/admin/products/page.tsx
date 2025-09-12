import { ProductsSection } from '@/components/admin/ProductsSection';
import { ProductsActions } from '@/components/admin/ProductsActions';
import { getAdminCategories, getAdminProducts } from '@/fetchers/admin';
import { SearchInput } from '@/components/admin/SearchInput';
import { Category, Product } from '@/types/products';
import type { Pagination } from '@/types/common';

type Props = {
  searchParams: Promise<{ page?: string; pageSize?: string; search?: string }>;
};

export default async function AdminProducts({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number.parseInt(params?.page ?? '1');
  const limit = Number.parseInt(params?.pageSize ?? '5');
  const q = params?.search ?? '';
  const categoriesRes = await getAdminCategories();
  const categories = categoriesRes?.data ?? [];

  const productsRes = await getAdminProducts({
    page,
    limit,
    q,
  });
  const filteredProducts = productsRes?.data?.products ?? [];
  const pagination = productsRes?.data?.pagination as Pagination | undefined;
  return (
    <>
      {/* Search and Actions */}
      <div className="flex justify-between items-center mb-6 w-full">
        <div className="flex justify-between w-full">
          <SearchInput />
          <ProductsActions />
        </div>
      </div>

      <ProductsSection
        filteredProducts={filteredProducts as Product[]}
        pagination={
          pagination ?? {
            currentPage: page,
            totalPages: 1,
            totalCount: filteredProducts.length,
            limit,
            hasNextPage: false,
            hasPrevPage: false,
          }
        }
        categories={categories as Category[]}
      />
    </>
  );
}
