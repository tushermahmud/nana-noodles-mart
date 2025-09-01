"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart, Heart, Flame, Star, Clock, Users, Award } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  popular: boolean;
  inStock: boolean;
  spiceLevel: number;
  features: string[];
}

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductPage = ({ params }: ProductPageProps) => {
  const { addItem, state } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState<string | null>(null);

  // Unwrap params Promise
  useEffect(() => {
    params.then((resolvedParams) => {
      setProductId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (!productId) return;
    
    const id = parseInt(productId);
    const foundProduct = productsData.find(p => p.id === id);
    
    if (!foundProduct) {
      notFound();
    }

    setProduct(foundProduct);
    setSelectedImage(foundProduct.image);

    // Find related products from the same category
    const related = productsData
      .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
      .slice(0, 3);
    setRelatedProducts(related);
  }, [productId]);

  const handleAddToCart = () => {
    if (!product || !product.inStock) return;
    
    setIsAdding(true);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    
    setTimeout(() => setIsAdding(false), 1000);
  };

  if (!product) {
    return null;
  }

  const cartItem = state.items.find(item => item.id === product.id);
  const isInCart = !!cartItem;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
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
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Popular Badge */}
                {product.popular && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                  >
                    Popular
                  </motion.div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-bold">
                  {product.category}
                </div>

                {/* Out of Stock Badge */}
                {!product.inStock && (
                  <div className="absolute top-16 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    Out of Stock
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedImage(product.image)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === product.image
                      ? 'border-pink-500 shadow-lg'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </button>
                {/* Add more thumbnail options here if needed */}
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Product Title and Price */}
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl font-black text-pink-600">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-xl text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice > product.price && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spice Level */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Spice Level</h3>
                <div className="flex items-center space-x-3">
                  <Flame className="w-6 h-6 text-red-500" />
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 rounded-full ${
                          i < product.spiceLevel ? 'bg-red-500' : 'bg-gray-200'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">
                    {product.spiceLevel}/5
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdding}
                  className={`flex-1 py-4 text-lg font-bold border-2 transition-all duration-300 ${
                    isInCart 
                      ? 'bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600' 
                      : 'bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white border-pink-500 hover:border-pink-600'
                  }`}
                >
                  {isAdding ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
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

              {/* Additional Info */}
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

          {/* Related Products */}
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
                        <div className="w-full h-48 overflow-hidden rounded-t-lg">
                          <img
                            src={relatedProduct.image}
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
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
                              {relatedProduct.category}
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

          {/* Back to Products Button */}
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

      <Footer />
    </div>
  );
};

export default ProductPage;
