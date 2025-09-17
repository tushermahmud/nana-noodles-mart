'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Flame, ChefHat, Leaf, Fish, Crown, Star } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import { Category, Product } from '@/types/products';
import { Cart } from '@/types/cart';
import { User } from '@/types/auth';
import { CATEGORY_COLORS } from '@/components/admin/CategoryCreateForm';

const iconMap = { ChefHat, Flame, Leaf, Fish, Crown, Star } as const;

type CategoryDetailsClientProps = {
  category: Category;
  products: Product[];
  cartDetails: Cart | null;
  loggedInUser: User | null;
};

export default function CategoryDetailsClient({
  category,
  products,
  cartDetails,
  loggedInUser,
}: CategoryDetailsClientProps) {
  const CategoryIcon = iconMap[category?.icon as keyof typeof iconMap];

  return (
    <>
      <div className="relative h-96 bg-gradient-to-br from-orange-50 via-white to-pink-50">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center space-x-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                className={`w-24 h-24 bg-gradient-to-r ${CATEGORY_COLORS.find((c) => c.label === category?.color)?.bg ?? 'from-pink-500 to-pink-600'} rounded-full flex items-center justify-center shadow-2xl`}
              >
                {CategoryIcon && <CategoryIcon className="w-12 h-12 text-white" />}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1"
              >
                <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-4 anime-title pt-10">
                  {category.name}
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl pop-text">
                  Discover our amazing collection of {category.name?.toLowerCase?.()}. From classic
                  favorites to innovative flavors, we have something for every taste.
                </p>
                <div className="flex items-center space-x-4 mt-4">
                  <span className="text-lg text-gray-700 font-semibold">
                    {category?.totalCount} items available
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gradient-to-br from-white via-pink-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 anime-title">
              {category?.name ?? ''} Collection
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto pop-text">
              Explore our complete collection of {category?.name?.toLowerCase?.()}. Each dish is
              crafted with care and premium ingredients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div key={product.id}>
                <ProductCard
                  product={product}
                  cartDetails={cartDetails}
                  loggedInUser={loggedInUser}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to All Categories</span>
            </motion.button>
          </Link>
        </div>
      </div>
    </>
  );
}
