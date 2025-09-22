'use client';

import { Star } from 'lucide-react';
import { useVirtualStore } from './hooks/useVirtualStore';
import { ShelfData } from './types';
import VirtualStoreHeader from './VirtualStoreHeader';
import Shelf from './Shelf';
import ProductModal from './modal/ProductModal';
import CallToAction from './CallToAction';
import { Product } from '@/types/products';
import { addToCart } from '@/actions/cart';
import { toast } from 'sonner';
import { User } from '@/types/auth';
import { getErrorMessage } from '@/lib/errorUtils';
import { useRouter } from 'next/navigation';

interface VirtualStoreProps {
  products: Product[];
  shelves?: ShelfData[];
  isProductsPage?: boolean;
  cartId: string;
  loggedInUser?: User | null;
}

const VirtualStore = ({
  products,
  shelves,
  isProductsPage,
  cartId,
  loggedInUser,
}: VirtualStoreProps) => {
  const { selectedProduct, isModalOpen, openModal, closeModal } = useVirtualStore({});
  const router = useRouter();
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

  const handleAddToCart = async (product: Product) => {
    try {
      if (loggedInUser?.cart_id) {
        const res = await addToCart({
          cartId: cartId,
          product_id: product.id,
          product_quantity: 1,
        });
        if (res?.isSuccess) {
          toast.success(res?.message ?? 'Product added to cart');
        } else {
          toast.error(res?.message ?? 'Failed to add product to cart');
        }
      } else {
        router.push(`/login?next=${encodeURIComponent('/products')}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    }
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
        {!isProductsPage && <CallToAction />}
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
