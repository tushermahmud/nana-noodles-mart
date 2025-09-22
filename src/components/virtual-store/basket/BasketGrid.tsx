'use client';

import Basket from './Basket';
import { Product } from '@/types/products';

interface BasketGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const BasketGrid = ({ products, onProductClick }: BasketGridProps) => {
  // Group products into baskets of 3
  const baskets = [];
  for (let i = 0; i < products.length; i += 3) {
    baskets.push(products.slice(i, i + 3));
  }

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full mx-auto z-10 gap-y-5">
      {baskets.map((basketProducts, index) => (
        <Basket
          key={basketProducts[0]?.id || index}
          products={basketProducts}
          index={index}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
};

export default BasketGrid;
