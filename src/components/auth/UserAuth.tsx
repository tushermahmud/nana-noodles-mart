'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/actions/auth';
import { toast } from 'sonner';
interface UserAuthProps {
  isMobile?: boolean;
}

const UserAuth = ({ isMobile = false }: UserAuthProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      // Just call logoutUser - it handles session cleanup
      const result = await logoutUser();
      
      if (result?.isSuccess) {
        toast.success('Logged out successfully');
        setIsLoggedIn(false);
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
      <div className={`flex items-center space-x-2 ${isMobile ? 'px-3 py-2' : ''}`}>
        <Button
          onClick={handleLogout}
          variant="outline"
          size={isMobile ? "default" : "sm"}
          className={`border-2 border-red-200 hover:border-red-300 text-red-600 hover:text-red-700 ${
            isMobile ? 'w-full' : ''
          }`}
          disabled={isLoading}
        >
          <LogOut className="w-4 h-4 mr-2" />
          {isLoading ? 'Logging out...' : 'Logout'}
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${isMobile ? 'px-3 py-2 space-y-2' : ''}`}>
      <Link href="/login">
        <Button
          variant="outline"
          size={isMobile ? "default" : "sm"}
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
          size={isMobile ? "default" : "sm"}
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

export default UserAuth;
