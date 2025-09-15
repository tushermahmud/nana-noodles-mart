'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import UserAuth from '@/components/auth/UserAuth';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { state } = useCart();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsClient(true);
    const qFromUrl = searchParams.get('q') || '';
    setSearchTerm(qFromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateToProducts = (value: string) => {
    const params = new URLSearchParams();
    if (value) params.set('q', value);
    params.set('page', '1');
    params.set('limit', '6');
    router.push(`/products?${params.toString()}`);
  };

  const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      navigateToProducts(searchTerm.trim());
    }
  };

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigateToProducts(searchTerm.trim());
  };

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="relative">
                <Image src="/logo.png" alt="Nana's Noodle Mart Logo" width={200} height={100} />
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <motion.a
              href="#categories"
              whileHover={{ y: -2 }}
              className="text-gray-700 hover:text-pink-600 font-semibold transition-colors"
            >
              Categories
            </motion.a>
            <motion.a
              href="/products"
              whileHover={{ y: -2 }}
              className="text-gray-700 hover:text-pink-600 font-semibold transition-colors"
            >
              Products
            </motion.a>
            <motion.a
              href="#about"
              whileHover={{ y: -2 }}
              className="text-gray-700 hover:text-pink-600 font-semibold transition-colors"
            >
              About
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              className="text-gray-700 hover:text-pink-600 font-semibold transition-colors"
            >
              Contact
            </motion.a>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <motion.form whileHover={{ scale: 1.05 }} className="relative" onSubmit={onSearchSubmit}>
              <Search className="w-5 h-5 text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={onSearchKeyDown}
                placeholder="Search ramen..."
                className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </motion.form>

            {/* Cart */}
            <motion.a
              href="/cart"
              whileHover={{ scale: 1.05 }}
              className="relative p-3 rounded-full bg-pink-100 hover:bg-pink-200 transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-pink-600" />
              {state.itemCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-pink-600 text-white text-xs rounded-full flex items-center justify-center font-bold"
                >
                  {state.itemCount > 99 ? '99+' : state.itemCount}
                </motion.div>
              )}
            </motion.a>

            {/* User Authentication */}
            <UserAuth />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md"
            >
              <div className="py-4 space-y-2">
                <motion.a
                  href="#categories"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Categories
                </motion.a>
                <motion.a
                  href="/products"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Products
                </motion.a>
                <motion.a
                  href="#about"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md transition-colors"
                  whileHover={{ x: 5 }}
                >
                  About
                </motion.a>
                <motion.a
                  href="#contact"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Contact
                </motion.a>

                {/* Mobile Search */}
                <div className="px-3 py-2">
                  <form className="relative" onSubmit={onSearchSubmit}>
                    <Search className="w-5 h-5 text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={onSearchKeyDown}
                      placeholder="Search ramen..."
                      className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </form>
                </div>

                {/* Mobile Cart */}
                <motion.a
                  href="/cart"
                  className="flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <span>Cart</span>
                  {state.itemCount > 0 && (
                    <span className="bg-pink-600 text-white text-xs rounded-full px-2 py-1 font-bold">
                      {state.itemCount > 99 ? '99+' : state.itemCount}
                    </span>
                  )}
                </motion.a>

                {/* Mobile User Authentication */}
                <UserAuth isMobile={true} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
