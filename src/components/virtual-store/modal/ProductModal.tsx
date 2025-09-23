'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Star, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/products';
import Image from 'next/image';
import Link from 'next/link';
import { Cart } from '@/types/cart';
interface ProductModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  cartDetails?: Cart;
}

const ProductModal = ({ isOpen, product, onClose, onAddToCart, cartDetails }: ProductModalProps) => {
  if (!isOpen || !product) return null;

  const cartItems = cartDetails?.cart ?? [];
  const cartItem = cartItems.find((item) => item?.product?.id === product?.id.toString());
  const isInCart = !!cartItem;

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  // Normalize features to an array (supports CSV strings or arrays)
  const features: string[] = Array.isArray((product as any).features)
    ? ((product as any).features as string[])
    : typeof (product as any).features === 'string'
      ? ((product as any).features as string)
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-pink-200 bg-gradient-to-br from-white via-pink-50/30 to-white"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">{product.name}</h2>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black text-pink-600">${product.price}</span>
                {product?.original_price && product.original_price > product.price && (
                  <span className="text-lg text-gray-400 line-through">
                    ${product.original_price}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Image with badges */}
          <div className="mb-6 relative">
            <div className="w-full h-64 rounded-xl overflow-hidden relative">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={800}
                height={400}
                className="w-full h-full object-contain bg-gradient-to-br from-amber-50 to-orange-100"
              />
              {/* Category Badge */}
              <div className="absolute top-2 right-2 bg-gradient-to-r from-gray-800 to-black text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                {product?.category?.name || 'Uncategorized'}
              </div>
              {/* Popular */}
              {product.popular && (
                <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  Popular
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description ||
              'A delicious and authentic ramen experience that brings the taste of Japan to your kitchen. Made with premium ingredients and traditional techniques.'}
          </p>

          {/* Features */}
          {features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {features.map((feature, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gradient-to-r from-yellow-50 to-orange-50 text-amber-700 text-xs rounded-full font-semibold border border-amber-200 shadow-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}

          {/* Spice Level */}
          <div className="flex items-center mb-6 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100">
            <Flame className="w-4 h-4 text-red-500 mr-2" />
            <span className="text-sm text-gray-700 font-semibold">
              Spice Level: {product?.spice_level ? product.spice_level : 0}/5
            </span>
            <div className="ml-auto flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${i < product.spice_level ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center mb-8 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black text-pink-600 anime-title">
                ${product.price}
              </span>
              {product.original_price && product.original_price > product.price && (
                <span className="text-lg text-gray-400 line-through pop-text">
                  ${product.original_price}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              onClick={handleAddToCart}
              className={`flex-1 font-bold border-2 transition-all duration-300 shadow-lg hover:shadow-xl ${
                isInCart
                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-green-500 hover:border-green-600'
                  : 'bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white border-pink-500 hover:border-pink-600'
              }`}            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Link href={`/products/${product.id}`}>
              <Button
                variant="outline"
                className="px-6 py-3 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-all duration-300"
              >
                View Product
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;
