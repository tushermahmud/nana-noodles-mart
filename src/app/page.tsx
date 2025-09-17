'use client';

import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Categories from '@/components/sections/Categories';
import { VirtualStore } from '@/components/virtual-store';
import AboutSection from '@/components/sections/AboutSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          'linear-gradient(180deg, #FD7399 0%, rgba(253, 115, 153, 0.15) 35%, #FD7399 100%)',
      }}
    >
      {' '}
      <Navbar />
      <Hero />
      <Categories />
      <VirtualStore />
      <AboutSection />
      <Footer />
    </div>
  );
}
