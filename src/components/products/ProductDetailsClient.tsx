'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ShoppingCart, Heart, Flame, Star, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import { Product } from '@/types/products';
import { Cart } from '@/types/cart';
import { User } from '@/types/auth';
import { toast } from 'sonner';
import { addToCart } from '@/actions/cart';
import { getErrorMessage } from '@/lib/errorUtils';
import { useRouter } from 'next/navigation';

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
  cartDetails: Cart | null;
  loggedInUser: User | null;
}

export default function ProductDetailsClient({
  product,
  relatedProducts,
  cartDetails,
  loggedInUser,
}: ProductDetailsClientProps) {
  const cartId = loggedInUser?.cart_id ?? '';
  const cartItems = cartDetails?.cart ?? null;
  const productInStock = product?.quantity > 0;
  const features = product?.features?.split(',') ?? [];
  const isRelatedProducts = relatedProducts.length > 0;
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const resolveImageUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) return url;
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const path = url.startsWith('public/') ? url : `public/storage/${url}`;
    return `${base.replace(/\/$/, '')}/${path}`;
  };
  const [selectedImage, setSelectedImage] = useState<string>(
    resolveImageUrl((product as any).imageUrl || (product as any).image)
  );

  const handleAddToCart = async (product: Product) => {
    try {
      if (loggedInUser?.cart_id) {
        setIsAdding(true);
        const res = await addToCart({
          cartId: cartId,
          product_id: product.id,
          product_quantity: 1,
        });
        if (res?.isSuccess) {
          toast.success(res?.message ?? 'Product added to cart');
          setIsAdding(false);
        } else {
          toast.error(res?.message ?? 'Failed to add product to cart');
          setIsAdding(false);
        }
      } else {
        router.push(`/login?next=${encodeURIComponent('/products')}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
      setIsAdding(false);
    }
  };

  const cartItem = cartItems?.find((item) => item.id === product.id) ?? null;
  const isInCart = !!cartItem;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-pink-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-pink-600 transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={
                  selectedImage ||
                  resolveImageUrl((product as any).imageUrl || (product as any).image)
                }
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              {product?.popular && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                >
                  Popular
                </motion.div>
              )}
              <div className="absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-bold">
                {product.category?.name ?? 'Uncategorized'}
              </div>
              {!productInStock && (
                <div className="absolute top-16 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  Out of Stock
                </div>
              )}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() =>
                  setSelectedImage(
                    resolveImageUrl((product as any).imageUrl || (product as any).image)
                  )
                }
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${selectedImage === resolveImageUrl((product as any).imageUrl || (product as any).image) ? 'border-pink-500 shadow-lg' : 'border-gray-200 hover:border-pink-300'}`}
              >
                <div className="relative w-20 h-20">
                  <Image
                    src={resolveImageUrl((product as any).imageUrl || (product as any).image)}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-black text-pink-600">${product.price}</span>
                {product?.original_price > product?.price && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.original_price}
                  </span>
                )}
                {product?.original_price > product?.price && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                    Save ${(product?.original_price - product?.price).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{product?.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Spice Level</h3>
              <div className="flex items-center space-x-3">
                <Flame className="w-6 h-6 text-red-500" />
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full ${i < product?.spice_level ? 'bg-red-500' : 'bg-gray-200'}`}
                    ></div>
                  ))}
                </div>
                <span className="text-gray-600 font-medium">{product?.spice_level}/5</span>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <Button
                size="lg"
                onClick={() => handleAddToCart(product)}
                disabled={!productInStock || isAdding}
                className={`flex-1 py-4 text-lg font-bold border-2 transition-all duration-300 ${isInCart ? 'bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600' : 'bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white border-pink-500 hover:border-pink-600'}`}
              >
                {isAdding ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : isInCart ? (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {productInStock ? 'Add to Cart' : 'Out of Stock'}
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 border-2 border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white transition-all duration-300"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 text-pink-600" />
                </div>
                <p className="text-sm text-gray-600">Premium Quality</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-sm text-gray-600">Quick Prep</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
                <p className="text-sm text-gray-600">Family Favorite</p>
              </div>
            </div>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              You Might Also Like
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/products/${relatedProduct.id}`}>
                    <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 border border-gray-200">
                      <div className="w-full h-48 overflow-hidden rounded-t-lg relative">
                        <Image
                          src={resolveImageUrl(
                            (relatedProduct as any).imageUrl || (relatedProduct as any).image
                          )}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 truncate">
                          {relatedProduct.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-pink-600">
                            ${relatedProduct.price}
                          </span>
                          <span className="text-sm text-gray-500">
                            {relatedProduct.category?.name ?? 'Uncategorized'}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link href="/products">
            <Button variant="outline" className="px-8 py-3 text-lg">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to All Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
