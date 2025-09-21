'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { User, LogOut, UserCircle, Settings, ShoppingBag, Heart, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/actions/auth';
import { toast } from 'sonner';

interface UserMenuProps {
  isMobile?: boolean;
}

const UserMenu = ({ isMobile = false }: UserMenuProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in by trying to access a protected endpoint
    const checkAuthStatus = async () => {
      try {
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch('/api/auth/check', {
          method: 'GET',
          credentials: 'include',
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.isLoggedIn || false);
          setUserData(data.user || null);
        } else {
          setIsLoggedIn(false);
          setUserData(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsLoggedIn(false);
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const result = await logoutUser();

      if (result?.isSuccess) {
        toast.success('Logged out successfully');
        setIsLoggedIn(false);
        setUserData(null);
        setIsMenuOpen(false);
        router.push('/');
        router.refresh();
      } else {
        toast.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={`flex items-center space-x-2 ${isMobile ? 'px-3 py-2' : ''}`}>
        <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div className={`relative ${isMobile ? 'px-3 py-2' : ''}`} ref={menuRef}>
        {/* Desktop User Menu */}
        {!isMobile && (
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 border-2 border-pink-200 hover:border-pink-300 text-pink-600 hover:text-pink-700"
            >
              <UserCircle className="w-4 h-4" />
              <span>{userData?.name || userData?.email || 'User'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        )}

        {/* Mobile User Menu */}
        {isMobile && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 px-3 py-2 bg-pink-50 rounded-md">
              <UserCircle className="w-5 h-5 text-pink-600" />
              <span className="text-gray-700 font-medium">
                {userData?.name || userData?.email || 'User'}
              </span>
            </div>
            
            <Link href="/profile" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:text-pink-600 hover:bg-pink-50"
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </Link>
            
            <Link href="/orders" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:text-pink-600 hover:bg-pink-50"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                My Orders
              </Button>
            </Link>
            
            <Link href="/wishlist" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:text-pink-600 hover:bg-pink-50"
              >
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
              </Button>
            </Link>
            
            <Link href="/settings" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:text-pink-600 hover:bg-pink-50"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
            
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              disabled={isLoading}
            >
              <LogOut className="w-4 h-4 mr-2" />
              {isLoading ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
        )}

        {/* Desktop Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && !isMobile && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
            >
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <UserCircle className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {userData?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {userData?.email || ''}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <Link href="/profile" className="block">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-none"
                  >
                    <User className="w-4 h-4 mr-3" />
                    Profile
                  </Button>
                </Link>
                
                <Link href="/orders" className="block">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-none"
                  >
                    <ShoppingBag className="w-4 h-4 mr-3" />
                    My Orders
                  </Button>
                </Link>
                
                <Link href="/wishlist" className="block">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-none"
                  >
                    <Heart className="w-4 h-4 mr-3" />
                    Wishlist
                  </Button>
                </Link>
                
                <Link href="/settings" className="block">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-none"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </Button>
                </Link>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-100 pt-2">
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 rounded-none"
                  disabled={isLoading}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  {isLoading ? 'Logging out...' : 'Logout'}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Not logged in - show login/register buttons
  return (
    <div className={`flex items-center space-x-2 ${isMobile ? 'px-3 py-2 space-y-2' : ''}`}>
      <Link href="/login">
        <Button
          variant="outline"
          size={isMobile ? 'default' : 'sm'}
          className={`border-2 border-pink-200 hover:border-pink-300 text-pink-600 hover:text-pink-700 ${
            isMobile ? 'w-full' : ''
          }`}
        >
          <User className="w-4 h-4 mr-2" />
          Login
        </Button>
      </Link>
      <Link href="/register">
        <Button
          size={isMobile ? 'default' : 'sm'}
          className={`bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white ${
            isMobile ? 'w-full' : ''
          }`}
        >
          Sign Up
        </Button>
      </Link>
    </div>
  );
};

export default UserMenu;
