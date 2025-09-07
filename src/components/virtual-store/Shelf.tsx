"use client";

import { motion } from "framer-motion";
import BasketGrid from "./basket/BasketGrid";
import { ShelfData, Product } from "./types";

interface ShelfProps {
  shelf: ShelfData;
  shelfIndex: number;
  onProductClick: (product: Product) => void;
}

const Shelf = ({ shelf, shelfIndex, onProductClick }: ShelfProps) => {
  return (
    <motion.div
      key={shelf.id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: shelfIndex * 0.2 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Virtual Store Shelf with Baskets */}
      <div className="bg-gradient-to-br">
        <div className="relative">
          <BasketGrid
            products={shelf.products}
            onProductClick={onProductClick}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Shelf;
