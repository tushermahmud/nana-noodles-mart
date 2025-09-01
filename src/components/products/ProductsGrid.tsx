"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  popular: boolean;
  inStock: boolean;
  spiceLevel: number;
  features: string[];
}

interface ProductsGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
}

const ProductsGrid = ({ products, title, subtitle, showHeader = true }: ProductsGridProps) => {
  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-white to-orange-50">
      {showHeader && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 anime-title">
            {title || "Our Signature"}{" "}
            <span className="gradient-text anime-text-shadow">
              {subtitle || "Ramen Collection"}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto pop-text">
            Each bowl is crafted with premium ingredients and traditional techniques. 
            From classic tonkotsu to innovative fusion flavors, discover ramen perfection.
          </p>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.a
              href="/products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl border-2 border-pink-500 hover:border-pink-600 transition-all duration-300 anime-glow btn-hover-effect"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductsGrid;
