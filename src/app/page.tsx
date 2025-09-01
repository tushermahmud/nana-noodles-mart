"use client";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Categories from "@/components/sections/Categories";
import ProductShowcase from "@/components/sections/ProductShowcase";
import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Categories />
      <ProductShowcase />
      <AboutSection />
      <Footer />
    </div>
  );
}
