export const dynamic = 'force-dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductsClient from '@/components/products/ProductsClient';
import { getAllProducts, getPublicCategories } from '@/fetchers/products';
import { getCurrentUser } from '@/fetchers/auth';
import { getCart } from '@/fetchers/cart';
import { Cart } from '@/types/cart';

type Props = {
  searchParams?: Promise<{ page?: string; limit?: string; q?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = (await searchParams) || {};
  const page = Number.parseInt(params.page || '1');
  const limit = Number.parseInt(params.limit || '6');
  const q = params.q || '';

  const initialRes = await getAllProducts({ page, limit, q: q });
  const initialProducts = initialRes?.data?.rows ?? [];
  const totalCount = initialRes?.data?.count ?? 0;
  const loggedInUserRes = await getCurrentUser();
  const loggedInUser = loggedInUserRes?.data?.data ?? null;
  const getCartDetailsRes = await getCart(loggedInUser?.cart_id ?? '');
  const cartDetails = getCartDetailsRes?.data?.data ?? {};
  const publicCategoriesRes = await getPublicCategories();
  const publicCategories = publicCategoriesRes?.data?.data ?? [];

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          'linear-gradient(180deg, #FD7399 0%, rgba(253, 115, 153, 0.15) 35%, #FD7399 100%)',
      }}
    >
      <ProductsClient
        initialProducts={initialProducts}
        totalCount={totalCount}
        pageSize={limit}
        initialQuery={q}
        loggedInUser={loggedInUser}
        cartDetails={cartDetails as Cart}
        categories={publicCategories}
      />
      <Footer />
    </div>
  );
}
