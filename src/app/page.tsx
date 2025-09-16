import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Categories from '@/components/sections/Categories';
import { VirtualStore } from '@/components/virtual-store';
import AboutSection from '@/components/sections/AboutSection';
import Footer from '@/components/layout/Footer';
import { getProducts } from '@/fetchers/products';
import { Product } from '@/types/products';
import { getCurrentUser } from '@/fetchers/auth';

export default async function Home() {
  const productsRes = await getProducts();
  const products = productsRes?.data?.data ?? [];
  const loggedInUserRes = await getCurrentUser();
  const loggedInUser = loggedInUserRes?.data?.data ?? null;
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50/40 to-black/5">
      <Navbar />
      <Hero />
      <Categories />
      <VirtualStore products={products as Product[]} cartId={loggedInUser?.cart_id ?? ""} />
      <AboutSection />
      <Footer />
    </div>
  );
}
