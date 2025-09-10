import { ProductsSection } from '@/components/admin/ProductsSection';
import { ProductsActions } from '@/components/admin/ProductsActions';
import { getAdminProducts } from '@/fetchers/admin';
import { SearchInput } from '@/components/admin/SearchInput';

type Props = {
  searchParams: Promise<{ page?: string; pageSize?: string; search?: string }>;
};

export default async function AdminProducts({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number.parseInt(params?.page ?? '1');
  const limit = Number.parseInt(params?.pageSize ?? '5');
  const search = params?.search ?? '';

  const productsRes = await getAdminProducts({
    page,
    limit,
    search,
  });
  const filteredProducts = productsRes?.data?.data ?? [];
  console.log(filteredProducts);
  return (
    <>
      {/* Search and Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-3">
          <SearchInput />
          <ProductsActions />
        </div>
      </div>

      <ProductsSection filteredProducts={filteredProducts} />
    </>
  );
}
