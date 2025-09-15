'use client';

import { Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useVirtualStore } from './hooks/useVirtualStore';
import { ShelfData } from './types';
import VirtualStoreHeader from './VirtualStoreHeader';
import Shelf from './Shelf';
import ProductModal from './modal/ProductModal';
import CallToAction from './CallToAction';
import { Product } from '@/types/products';

interface VirtualStoreProps {
  products: Product[];
  shelves?: ShelfData[];
  isProductsPage?: boolean;
}

const VirtualStore = ({ products, shelves, isProductsPage }: VirtualStoreProps) => {
  const { addItem } = useCart();
  const { selectedProduct, isModalOpen, openModal, closeModal } = useVirtualStore({});

  // Default shelves configuration
  const defaultShelves: ShelfData[] = [
    {
      id: 'popular',
      name: 'Popular Favorites',
      description: 'Our best-selling ramen varieties',
      icon: Star,
      color: 'from-pink-500 to-orange-500',
      products: products,
    },
  ];

  const shelvesToRender = shelves || defaultShelves;

  const handleAddToCart = (product: Product) => {
    addItem({ 
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      category: product.category?.name ?? '',
    });
  };

  return (
    <section className="py-20 overflow-hidden">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <VirtualStoreHeader />

        {/* Virtual Store Shelves */}
        <div className="space-y-20 px-2 md:px-6 py-10 rounded-lg">
          {shelvesToRender.map((shelf, shelfIndex) => (
            <Shelf
              key={shelf.id}
              shelf={shelf}
              shelfIndex={shelfIndex}
              onProductClick={openModal}
            />
          ))}
        </div>
        {!isProductsPage && (
          <CallToAction />
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={closeModal}
        onAddToCart={handleAddToCart}
      />
    </section>
  );
};

export default VirtualStore;
