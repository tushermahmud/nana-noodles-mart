export const dynamic = 'force-dynamic';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Categories from '@/components/sections/Categories';
import { VirtualStore } from '@/components/virtual-store';
import AboutSection from '@/components/sections/AboutSection';
import Footer from '@/components/layout/Footer';
import { getPublicCategories, getProducts } from '@/fetchers/products';
import { Product } from '@/types/products';
import { getCurrentUser } from '@/fetchers/auth';
import { getCart } from '@/fetchers/cart';
import { Cart } from '@/types/cart';


export default async function Home() {
  const productsRes = await getProducts();
  const products = productsRes?.data?.data ?? [];
  const loggedInUserRes = await getCurrentUser();
  const loggedInUser = loggedInUserRes?.data?.data ?? null;
  const getCartDetailsRes = await getCart(loggedInUser?.cart_id ?? '');
  const getCartDetails = getCartDetailsRes?.data?.data ?? {};
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
      {' '}
      <Navbar cartDetails={getCartDetails as Cart} loggedInUser={loggedInUser} />
      <Hero />
      <Categories categories={publicCategories} />
      <VirtualStore
        products={products as Product[]}
        cartId={loggedInUser?.cart_id ?? ''}
        loggedInUser={loggedInUser}
      />
      <AboutSection />
      <Footer />
    </div>
  );
}
