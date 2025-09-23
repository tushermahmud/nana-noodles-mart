import CategoryDetailsClient from '@/components/categories/CategoryDetailsClient';
import { getCurrentUser } from '@/fetchers/auth';
import { getCart } from '@/fetchers/cart';
import { getProductsByCategory } from '@/fetchers/products';

type CategoryPageProps = {
  params: Promise<{ id: string }>;  
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const p = await params;
  const productsByCategoryRes = await getProductsByCategory(p.id);
  const category = productsByCategoryRes?.data?.data?.category ?? null;
  const productsByCategory = productsByCategoryRes?.data?.data?.productsWithImageUrl ?? [];
  const loggedInUserRes = await getCurrentUser();
  const loggedInUser = loggedInUserRes?.data?.data ?? null;
  const getCartDetailsRes = await getCart(loggedInUser?.cart_id ?? '');
  const cartDetails = getCartDetailsRes?.data?.data ?? null;
  if (!category) {
    return (
      <div className="min-h-screen bg-white">
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center pt-32">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Category not found</h2>
            <a
              href="/products"
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg"
            >
              Back to Products
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <CategoryDetailsClient
        category={category}
        products={productsByCategory}
        cartDetails={cartDetails}
        loggedInUser={loggedInUser}
      />
    </div>
  );
}
