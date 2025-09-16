'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { use } from 'react';
import { ArrowLeft, Flame, ChefHat, Leaf, Fish, Crown, Star } from 'lucide-react';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import Link from 'next/link';

// Icon mapping
const iconMap = {
  ChefHat,
  Flame,
  Leaf,
  Fish,
  Crown,
  Star,
};

interface CategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

const CategoryPage = ({ params }: CategoryPageProps) => {
  const { id } = use(params);
  const [category, setCategory] = useState<any>(null);
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const productsPerPage = 6;

  // Memoize filtered products
  const filteredProducts = useMemo(() => {
    if (!category) return [];
    return productsData.filter((product) => product.category_id === category.id);
  }, [category]);

  // Initialize category and products
  useEffect(() => {
    const categoryId = parseInt(id);
    const foundCategory = categoriesData.find((c) => c.id === categoryId);

    if (!foundCategory) {
      // Handle category not found
      return;
    }

    setCategory(foundCategory);

    // Reset products
    setDisplayedProducts([]);
    setCurrentPage(1);
    setHasMore(true);
    setLoading(false);

    // Load initial products
    const initialProducts = filteredProducts.slice(0, productsPerPage);
    setDisplayedProducts(initialProducts);
    setCurrentPage(2);
  }, [id, filteredProducts, productsPerPage]);

  // Load more products function
  const loadMoreProducts = useCallback(() => {
    setLoading((prevLoading) => {
      if (prevLoading) return prevLoading;

      setLoading(true);

      setTimeout(() => {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const newProducts = filteredProducts.slice(startIndex, endIndex);

        if (newProducts.length === 0) {
          setHasMore(false);
        } else {
          setDisplayedProducts((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const uniqueNewProducts = newProducts.filter((p) => !existingIds.has(p.id));
            return [...prev, ...uniqueNewProducts];
          });
          setCurrentPage((prev) => prev + 1);
        }

        setLoading(false);
      }, 500);

      return true;
    });
  }, [currentPage, filteredProducts, productsPerPage]);

  // Infinite scroll handler
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight * 0.8) {
        loadMoreProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreProducts]);

  if (!category) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center pt-32">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Category not found</h2>
            <Link href="/products">
              <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg">
                Back to Products
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const CategoryIcon = iconMap[category.icon as keyof typeof iconMap];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Category Banner */}
      <div className="relative h-96 bg-gradient-to-br from-orange-50 via-white to-pink-50">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center space-x-6">
              {/* Category Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                className={`w-24 h-24 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center shadow-2xl`}
              >
                <CategoryIcon className="w-12 h-12 text-white" />
              </motion.div>

              {/* Category Info */}
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
                  Discover our amazing collection of {category.name.toLowerCase()}. From classic
                  favorites to innovative flavors, we have something for every taste.
                </p>
                <div className="flex items-center space-x-4 mt-4">
                  <span className="text-lg text-gray-700 font-semibold">
                    {category.count} items available
                  </span>
                  {category.popular && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-bold">
                      Popular Category
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-20 bg-gradient-to-br from-white via-pink-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 anime-title">
              {category.name} Collection
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto pop-text">
              Explore our complete collection of {category.name.toLowerCase()}. Each dish is crafted
              with care and premium ingredients.
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((product, index) => (
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

          {/* Loading Indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-12"
            >
              <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
          )}

          {/* No More Products */}
          {!hasMore && displayedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-12"
            >
              <p className="text-gray-600 pop-text">
                You've reached the end of our {category.name.toLowerCase()} collection! 🍜
              </p>
            </motion.div>
          )}

          {/* No Products Found */}
          {displayedProducts.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-12"
            >
              <div className="text-6xl mb-4">🍜</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 anime-title">
                No products found
              </h3>
              <p className="text-gray-600 pop-text">
                This category is currently empty. Check back later!
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Back to Categories Button */}
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

      <Footer />
    </div>
  );
};

export default CategoryPage;
