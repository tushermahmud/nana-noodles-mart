"use client";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Categories from "@/components/sections/Categories";
import VirtualStore from "@/components/sections/VirtualStore";
import ProductShowcase from "@/components/sections/ProductShowcase";
import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50/40 to-black/5">
      <Navbar />
      <Hero />
      <Categories />
      <VirtualStore />
      <ProductShowcase />
      <AboutSection />
      <Footer />
    </div>
  );
}
