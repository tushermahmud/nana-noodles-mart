import ProductDetailsClient from '@/components/products/ProductDetailsClient';
import { notFound } from 'next/navigation';
import { getProduct, getRelatedProducts } from '@/fetchers/products';
import { getCart } from '@/fetchers/cart';
import { getCurrentUser } from '@/fetchers/auth';

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const p = await params;
  const loggedInUserRes = await getCurrentUser();
  const loggedInUser = loggedInUserRes?.data?.data ?? null;
  const getCartDetailsRes = await getCart(loggedInUser?.cart_id ?? '');
  const cartDetails = getCartDetailsRes?.data?.data ?? null;
  const product = await getProduct(p.id);
  const foundProduct = product?.data?.data ?? null;
  const relatedProductsRes = await getRelatedProducts(p.id);
  const related = relatedProductsRes?.data?.data ?? [];
  if (!foundProduct) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <ProductDetailsClient
        product={foundProduct}
        relatedProducts={related}
        cartDetails={cartDetails}
        loggedInUser={loggedInUser}
      />
    </div>
  );
}
