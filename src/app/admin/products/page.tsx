export const dynamic = 'force-dynamic';
import { ProductsSection } from '@/components/admin/ProductsSection';
import { ProductsActions } from '@/components/admin/ProductsActions';
import { getAdminByCategories, getAdminProducts } from '@/fetchers/admin';
import { SearchInput } from '@/components/admin/SearchInput';

type Props = {
  searchParams: Promise<{ page?: string; pageSize?: string; search?: string }>;
};

export default async function AdminProducts({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number.parseInt(params?.page ?? '1');
  const limit = Number.parseInt(params?.pageSize ?? '5');
  const q = params?.search ?? '';
  const categoriesRes = await getAdminByCategories();

  const categories = categoriesRes?.data ?? [];

  const productsRes = await getAdminProducts({
    page,
    limit,
    q,
  });
  const filteredProducts = productsRes?.data?.rows ?? [];
  const pagination = productsRes?.data?.count;
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
        filteredProducts={filteredProducts}
        count={pagination ?? 0}
        categories={categories}
      />
    </>
  );
}
