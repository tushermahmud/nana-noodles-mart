'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Categories from '@/components/sections/Categories-backup';
import { VirtualStore } from '@/components/virtual-store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BASE_URL } from '@/config/env';
import { Cart } from '@/types/cart';
import { User } from '@/types/auth';
import { Category } from '@/types/products';

type Product = any;

type Props = {
  initialProducts: Product[];
  totalCount: number;
  pageSize?: number;
  initialQuery?: string;
  cartDetails?: Cart;
  loggedInUser?: User;
  categories: Category[];
};

export default function ProductsClient({
  initialProducts,
  totalCount,
  pageSize = 12,
  initialQuery = '',
  cartDetails,
  loggedInUser,
  categories,
}: Props) {
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(initialProducts || []);
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page') || 1));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState((initialProducts?.length || 0) < totalCount);

  // Read q from URL (Navbar controls it)
  const q = searchParams.get('q') || initialQuery;
  const cartId =
    cartDetails &&
    cartDetails?.cart &&
    cartDetails?.cart.length > 0 &&
    cartDetails?.cart[0]?.cart_id
      ? cartDetails?.cart[0]?.cart_id
      : '';
  // Prevent rapid duplicate loads
  const loadingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Reset client list whenever server-provided data changes (new q/page/limit)
  useEffect(() => {
    setDisplayedProducts(initialProducts || []);
    setCurrentPage(Number(searchParams.get('page') || 1));
    setHasMore((initialProducts?.length || 0) < totalCount);
  }, [initialProducts, totalCount]);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return displayedProducts;
    return displayedProducts.filter((p: any) => p.category_id === selectedCategory);
  }, [selectedCategory, displayedProducts]);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || loading || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const params = new URLSearchParams({ page: String(nextPage), limit: String(pageSize) });
      if (q) params.set('q', q);
      const res = await fetch(`${BASE_URL}/product-page?${params.toString()}`, {
        cache: 'no-store',
      });
      const data = await res.json();
      const newRows = data?.data?.rows || [];
      const newCount = data?.data?.count ?? totalCount;
      setDisplayedProducts((prev) => {
        const existingIds = new Set(prev.map((p: any) => p.id));
        const unique = newRows.filter((p: any) => !existingIds.has(p.id));
        return [...prev, ...unique];
      });
      setCurrentPage(nextPage);
      setHasMore((prev) => displayedProducts.length + newRows.length < newCount);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [loading, hasMore, currentPage, pageSize, totalCount, displayedProducts.length, q]);

  useEffect(() => {
    if (typeof window === 'undefined' || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: '150px' }
    );
    const el = sentinelRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [loadMore, hasMore]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-orange-50">
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Categories categories={categories} />

          <VirtualStore
            products={filteredProducts}
            isProductsPage={true}
            cartId={cartId}
            loggedInUser={loggedInUser}
          />

          {hasMore && (
            <div ref={sentinelRef} id="infinite-scroll-sentinel" className="h-1 w-full" />
          )}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-12"
            >
              <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
          )}

          {!hasMore && filteredProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-12"
            >
              <p className="text-gray-600">
                You've reached the end of our delicious collection! 🍜
              </p>
            </motion.div>
          )}

          {filteredProducts.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-12"
            >
              <div className="text-6xl mb-4">🍜</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try another search or category.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
