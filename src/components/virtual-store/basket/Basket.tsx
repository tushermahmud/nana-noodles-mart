"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "../types";

interface BasketProps {
  products: Product[];
  index: number;
  onProductClick: (product: Product) => void;
}

const Basket = ({ products, index, onProductClick }: BasketProps) => {
  const [firstProduct, secondProduct, thirdProduct] = products;

  return (
    <motion.div
      key={firstProduct?.id || index}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="cursor-pointer"
    >
      {/* Individual Basket Container */}
      <div className="relative">
        {/* Real Basket Image Background */}
        <div className="relative w-full h-48 rounded-lg">
          {/* Use the actual shelf/basket image */}
          <img
            src="/shelf-basket2-removebg-preview.png"
            alt="Product Basket"
            className="w-full h-full object-cover"
          />
          
          {/* Noodle Products inside basket */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-3/4 flex items-center justify-center"
            >
              {/* First Product */}
              {firstProduct && (
                <ProductCard
                  product={firstProduct}
                  position="first"
                  onProductClick={onProductClick}
                />
              )}

              {/* Second Product (if exists) */}
              {secondProduct && (
                <ProductCard
                  product={secondProduct}
                  position="second"
                  onProductClick={onProductClick}
                />
              )}

              {/* Third Product (if exists) */}
              {thirdProduct && (
                <ProductCard
                  product={thirdProduct}
                  position="third"
                  onProductClick={onProductClick}
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Basket;
