import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductsClient from '@/components/products/ProductsClient';
import { getAllProducts, getProducts } from '@/fetchers/products';

type Props = {
  searchParams?: Promise<{ page?: string; limit?: string; q?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = (await searchParams) || {};
  const page = Number.parseInt(params.page || '1');
  const limit = Number.parseInt(params.limit || '6');
  const q = params.q || '';

  const initialRes = await getAllProducts({ page, limit, q: q });
  console.log(initialRes);
  const initialProducts = initialRes?.data?.rows ?? [];
  console.log(initialProducts);
  const totalCount = initialRes?.data?.count ?? 0;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ProductsClient initialProducts={initialProducts} totalCount={totalCount} pageSize={limit} initialQuery={q} />
      <Footer />
    </div>
  );
}
