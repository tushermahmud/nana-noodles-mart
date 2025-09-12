'use client';

import React from 'react';
import { getProducts, getCurrentUser } from '@/fetchers/products';
import { loginUser, addToCart } from '@/actions/auth';
import { getCart } from '@/fetchers/cart';

/**
 * Example component showing how to use the new API structure
 * This demonstrates the separation between fetchers (GET) and actions (POST/PUT/PATCH/DELETE)
 */
export default function UsageExample() {
  // Example of using fetchers (GET requests)
  const handleFetchProducts = async () => {
    try {
      const result = await getProducts({ page: 1, limit: 10 });
      if (result.isSuccess) {
        console.log('Products:', result.data);
      } else {
        console.error('Error:', result.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleGetCurrentUser = async () => {
    try {
      const result = await getCurrentUser();
      if (result.isSuccess) {
        console.log('Current user:', result.data);
      } else {
        console.error('Error:', result.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleGetCart = async () => {
    try {
      const result = await getCart();
      if (result.isSuccess) {
        console.log('Cart:', result.data);
      } else {
        console.error('Error:', result.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // Example of using actions (POST/PUT/PATCH/DELETE requests)
  const handleLogin = async () => {
    try {
      const result = await loginUser({
        email: 'user@example.com',
        password: 'password123',
      });
      if (result.isSuccess) {
        console.log('Login successful:', result.data);
        // Store token in localStorage
        if (result.data?.token) {
          localStorage.setItem('authToken', result.data.token);
        }
      } else {
        console.error('Login error:', result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const result = await addToCart({
        productId: 'product-id',
        quantity: 2,
      });
      if (result.isSuccess) {
        console.log('Added to cart:', result.data);
      } else {
        console.error('Add to cart error:', result.message);
      }
    } catch (error) {
      console.error('Add to cart error:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">API Usage Examples</h1>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Fetchers (GET requests)</h2>
        <div className="space-x-2">
          <button
            onClick={handleFetchProducts}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Fetch Products
          </button>
          <button
            onClick={handleGetCurrentUser}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Get Current User
          </button>
          <button
            onClick={handleGetCart}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Get Cart
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Actions (POST/PUT/PATCH/DELETE requests)</h2>
        <div className="space-x-2">
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Login User
          </button>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">How to use:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Fetchers:</strong> Import from <code>@/fetchers/[module]</code> for GET requests
          </li>
          <li>
            <strong>Actions:</strong> Import from <code>@/actions/[module]</code> for
            POST/PUT/PATCH/DELETE requests
          </li>
          <li>
            <strong>API Endpoints:</strong> Defined in <code>@/api/[module]</code> files
          </li>
          <li>
            <strong>Types:</strong> Defined in <code>@/types/[module]</code> files
          </li>
          <li>
            <strong>Server Actions:</strong> All actions use "use server" directive for Next.js
          </li>
        </ul>
      </div>
    </div>
  );
}
