'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, Truck } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { useEffect } from 'react';
import { Cart } from '@/types/cart';
import Image from 'next/image';
import { updateCartItem } from '@/actions/cart';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/errorUtils';
import { removeCartItem } from '@/actions/cart';

type CartClientProps = {
  cartDetails?: Cart;
  // Optional: can hydrate quickly from server
  initial?: {
    items?: Array<{
      id: string;
      name: string;
      price: number;
      image: string;
      quantity: number;
      category?: string;
    }>;
  };
};

export default function CartClient({ cartDetails }: CartClientProps) {
  const numberOfCartItems = cartDetails?.cart?.length ?? 0;
  const subTotalAmount =
    cartDetails?.cart?.reduce((acc, item) => acc + item.product?.price * item.quantity, 0) ?? 0;
  const taxPercentage = 0.08;
  const handleQuantityChange = async (id: string, newQuantity: number) => {
    try {
      const res = await updateCartItem({
        cartId: cartDetails?.cart[0]?.cart_id ?? '',
        product_id: id,
        product_quantity: newQuantity,
      });
      if (res?.isSuccess) {
        toast.success(res?.message ?? 'Cart item updated successfully');
      } else {
        toast.error(res?.message ?? 'Failed to update cart item');
      }
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    }
  };

  const handleRemoveItem = async (product_id: string) => {
    try {
      const res = await removeCartItem(product_id, cartDetails?.cart[0]?.cart_id ?? '');
      if (res?.isSuccess) {
        toast.success(res?.message ?? 'Cart item removed successfully');
      } else {
        toast.error(res?.message ?? 'Failed to remove cart item');
      }
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    }
  };
  const clearCart = () => {
    return;
  };

  if (numberOfCartItems === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 max-w-md">
            Looks like you haven't added any delicious ramen yet. Start shopping!
          </p>
          <div className="space-x-4">
            <Link href="/products">
              <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3">
                Browse Products
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="px-8 py-3">
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Shopping <span className="text-pink-600">Cart</span>
              </h1>
              <p className="text-lg text-gray-600">
                {numberOfCartItems} items • Total: ${subTotalAmount?.toFixed(2)}
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cart Items</h2>
              <div className="space-y-4">
                <AnimatePresence>
                  {cartDetails?.cart?.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={item?.product?.imageUrl}
                                alt={item?.product?.name}
                                className="w-full h-full object-cover"
                                width={80}
                                height={80}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                                {item?.product?.name}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">
                                Category: {item?.product?.category?.name ?? 'Uncategorized'}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xl font-bold text-pink-600">
                                  ${item?.product?.price}
                                </span>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.product_id.toString(),
                                        item.quantity - 1
                                      )
                                    }
                                    className="w-8 h-8 p-0"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </Button>
                                  <span className="w-12 text-center text-sm font-semibold">
                                    {item?.quantity}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.product_id.toString(),
                                        item.quantity + 1
                                      )
                                    }
                                    className="w-8 h-8 p-0"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.product_id.toString())}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-100 text-right">
                            <span className="text-lg font-semibold text-gray-900">
                              Item Total: ${(item?.product?.price * item?.quantity).toFixed(2)}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="mt-6 text-right">
                <Button
                  variant="outline"
                  onClick={() => clearCart()}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Clear Cart
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-8 border border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({numberOfCartItems} items)</span>
                    <span>${subTotalAmount?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${(subTotalAmount * taxPercentage).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>${(subTotalAmount + subTotalAmount * taxPercentage).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Link href="/checkout">
                  <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 text-lg font-bold">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Checkout
                  </Button>
                </Link>
                <div className="text-center text-sm text-gray-500 space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Truck className="w-4 h-4" />
                    <span>Free shipping on orders $50+</span>
                  </div>
                  <p>Secure checkout powered by Stripe</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
