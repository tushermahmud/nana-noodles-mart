"use client";

import { motion } from "framer-motion";
import ProductsGrid from "@/components/products/ProductsGrid";
import productsData from "@/data/products.json";

const ProductShowcase = () => {
  // Get first 9 products for the homepage showcase
  const featuredProducts = productsData.slice(0, 9);

  return (
    <ProductsGrid 
      products={featuredProducts}
      title="Our Signature"
      subtitle="Ramen Collection"
      showHeader={true}
    />
  );
};

export default ProductShowcase;
