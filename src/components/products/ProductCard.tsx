'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart, Heart, Flame, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/products';
import { User } from '@/types/auth';
import { Cart } from '@/types/cart';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/errorUtils';
import { addToCart } from '@/actions/cart';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
  cartDetails: Cart | null;
  loggedInUser: User | null;
}

export default function ProductCard({ product, cartDetails, loggedInUser }: ProductCardProps) {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const cartItems = cartDetails?.cart ?? [];
  console.log(cartItems);
  console.log(product);
  const cartItem = cartItems.find((item) => item?.product?.id === product?.id.toString());
  const isInCart = !!cartItem;
  const inStock = product?.quantity > 0;
  const features = product?.features?.split(',') ?? [];
  console.log(cartItem);
  console.log(isInCart);
  const handleAddToCart = async () => {
    debugger;
    try {
      if (loggedInUser?.cart_id) {
        const res = await addToCart({
          cartId: loggedInUser?.cart_id,
          product_id: product.id,
          product_quantity: 1,
        });
        if (res?.isSuccess) {
          toast.success(res?.message ?? 'Product added to cart');
        } else {
          toast.error(res?.message ?? 'Failed to add product to cart');
        }
      } else {
        toast.error('Please login to add product to cart');
        router.push('/login');
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-pink-200 overflow-hidden relative bg-gradient-to-br from-white via-pink-50/30 to-white backdrop-blur-sm anime-border">
      <CardHeader className="pb-4">
        <div className="relative">
          {/* Product Image - Clickable */}
          <Link href={`/products/${product.id}`}>
            <div className="w-full h-48 rounded-xl overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-300 relative cursor-pointer">
              <Image
                src={product?.imageUrl ?? ''}
                alt={product?.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-400"
                sizes="(max-width: 1024px) 100vw, 400px"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

              {/* Floating elements with gold/cream colors */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-80 anime-glow"
              />
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-2 left-2 w-2 h-2 bg-gradient-to-r from-amber-200 to-yellow-200 rounded-full opacity-80 anime-glow"
              />
            </div>
          </Link>

          {/* Popular Badge with gold accent */}
          {product?.popular && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg anime-glow"
            >
              Popular
            </motion.div>
          )}

          {/* Category Badge with black theme */}
          <div className="absolute top-2 right-2 bg-gradient-to-r from-gray-800 to-black text-white px-3 py-1 rounded-full text-xs font-bold pop-text shadow-lg">
            {product?.category?.name ?? ''}
          </div>

          {/* Out of Stock Badge */}
          {!inStock && (
            <div className="absolute top-12 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold anime-glow">
              Out of Stock
            </div>
          )}

          {/* In Cart Badge */}
          {isInCart && (
            <div className="absolute top-12 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold anime-glow">
              In Cart ({cartItem.quantity})
            </div>
          )}
        </div>

        {/* Product Title - Clickable */}
        <Link href={`/products/${product.id}`}>
          <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors anime-title cursor-pointer">
            {product?.name ?? ''}
          </CardTitle>
        </Link>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-600 mb-4 leading-relaxed pop-text">{product?.description ?? ''}</p>

        {/* Features with gold/cream accents */}
        <div className="flex flex-wrap gap-2 mb-4">
          {features?.map((feature, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gradient-to-r from-yellow-50 to-orange-50 text-amber-700 text-xs rounded-full font-semibold pop-text border border-amber-200 shadow-sm"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Spice Level with enhanced styling */}
        <div className="flex items-center mb-4 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100">
          <Flame className="w-4 h-4 text-red-500 mr-2" />
          <span className="text-sm text-gray-700 font-semibold pop-text">
            Spice Level: {product?.spice_level ?? 1}/5 {product?.spice_level ?? 1}
          </span>
          {/* Spice level indicator with gold/cream dots */}
          <div className="ml-auto flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < (product?.spice_level ?? 1)
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Price and CTA with enhanced styling */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg border border-pink-100">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black text-pink-600 anime-title">${product.price}</span>
            {product?.original_price > product.price && (
              <span className="text-lg text-gray-400 line-through pop-text">
                ${product?.original_price ?? 0}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="default"
            size="sm"
            className={`flex-1 font-bold border-2 transition-all duration-300 shadow-lg hover:shadow-xl ${
              isInCart
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-green-500 hover:border-green-600'
                : 'bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white border-pink-500 hover:border-pink-600'
            }`}
            onClick={handleAddToCart}
            disabled={!inStock || isAdding}
          >
            {isAdding ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
            ) : isInCart ? (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </>
            )}
          </Button>
          <Link href={`/products/${product?.id ?? ''}`}>
            <Button
              variant="outline"
              size="sm"
              className="border-2 border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white btn-hover-effect shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
