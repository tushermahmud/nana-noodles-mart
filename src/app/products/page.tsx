'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Flame, ChefHat, Leaf, Fish, Crown, Star } from 'lucide-react';
import productsData from '@/data/products.json';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import Categories from '@/components/sections/Categories';

// Icon mapping
const iconMap = {
  ChefHat,
  Flame,
  Leaf,
  Fish,
  Crown,
  Star,
};

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const productsPerPage = 6;

  // Memoize filtered products to prevent recalculation on every render
  const filteredProducts = useMemo(() => {
    return selectedCategory
      ? productsData.filter((product) => product.category_id === selectedCategory)
      : productsData;
  }, [selectedCategory]);

  // Initialize products
  useEffect(() => {
    // Reset everything when category changes
    setDisplayedProducts([]);
    setCurrentPage(1);
    setHasMore(true);
    setLoading(false);

    // Load initial products for the new category
    const initialProducts = filteredProducts.slice(0, productsPerPage);
    setDisplayedProducts(initialProducts);
    setCurrentPage(2);
  }, [selectedCategory, filteredProducts, productsPerPage]);

  // Load more products function
  const loadMoreProducts = useCallback(() => {
    setLoading((prevLoading) => {
      if (prevLoading) return prevLoading; // Already loading

      setLoading(true);

      // Simulate API delay
      setTimeout(() => {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const newProducts = filteredProducts.slice(startIndex, endIndex);

        if (newProducts.length === 0) {
          setHasMore(false);
        } else {
          // Ensure no duplicate products by checking IDs
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-orange-50">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-20 pb-16 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 anime-title">
            Our <span className="gradient-text anime-text-shadow">Products</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto pop-text">
            Discover our complete collection of handcrafted ramen. From classic favorites to
            innovative fusion flavors, we have something for every taste and preference.
          </p>
        </motion.div>

        {/* Categories Section */}
        <Categories onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />

        {/* Products Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  You've reached the end of our delicious collection! 🍜
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
                  Try selecting a different category or check back later!
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
