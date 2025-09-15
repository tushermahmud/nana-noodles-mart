import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Categories from '@/components/sections/Categories';
import { VirtualStore } from '@/components/virtual-store';
import AboutSection from '@/components/sections/AboutSection';
import Footer from '@/components/layout/Footer';
import { getProducts } from '@/fetchers/products';
import { Product } from '@/types/products';

export default async function Home() {
  const productsRes = await getProducts();
  const products = productsRes?.data?.data ?? [];
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50/40 to-black/5">
      <Navbar />
      <Hero />
      <Categories />
      <VirtualStore products={products as Product[]} />
      <AboutSection />
      <Footer />
    </div>
  );
}
