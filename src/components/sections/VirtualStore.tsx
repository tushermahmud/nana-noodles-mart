"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Flame, ChefHat, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import productsData from "@/data/products.json";
import Link from "next/link";

const VirtualStore = () => {
  const [currentShelf, setCurrentShelf] = useState(0);
  const { addItem } = useCart();

  // Group products by category for different shelves
  const shelves = [
    {
      id: "popular",
      name: "Popular Favorites",
      description: "Our best-selling ramen varieties",
      icon: Star,
      color: "from-pink-500 to-orange-500",
      products: productsData.filter(p => p.popular).slice(0, 9)
    },
    
  ];

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };

  return (
    <section className="py-20  overflow-hidden">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 anime-title">
            Welcome to <span className="gradient-text anime-text-shadow">Nana's Virtual Store</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto pop-text">
            Browse our interactive shelves and discover the perfect ramen for your taste buds.
          </p>
        </div>

{/*         <div className="bg-black w-full py-20 ml-7 skew-x-4 test-bg-2"></div>
 */}
        {/* Virtual Store Shelves */}
        <div className="space-y-20 px-6 py-10 rounded-lg">
          {shelves.map((shelf, shelfIndex) => (
            <motion.div
              key={shelf.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: shelfIndex * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              

              {/* Virtual Store Shelf with Baskets */}
              <div className="bg-gradient-to-br">
                <div className="relative">
                  {/* Shelf Background Image */}
                  <div className="absolute inset-0 flex justify-center items-center opacity-30">
                    <img
                      src="/shelf-display.png"
                      alt="Shelf Background"
                      className="w-full max-w-4xl h-auto shadow-xl"
                    />
                  </div>
                  
                  {/* Shelf Grid - 3x3 baskets */}
                  <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full mx-auto z-10 gap-y-5">
                    {shelf.products.slice(0, 9).map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group cursor-pointer"
                        onClick={() => handleAddToCart(product)}
                      >
                        {/* Individual Basket Container */}
                        <div className="relative">
                          {/* Real Basket Image Background */}
                          <div className="relative w-full h-48 rounded-lg">
                            {/* Use the actual shelf/basket image */}
                            <img
                              src="/shelf-basket2-removebg-preview.png"
                              alt="Product Basket"
                              className="w-full h-full object-cover"
                            />
                            
                            {/* Noodle Product inside basket */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div
                                whileHover={{ rotate: 0 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-full h-3/4 flex items-center justify-center"
                              >
                                <img
                                  src={"/ramen-bowl-1.webp"}
                                  alt={product.name}
                                  className="h-full object-contain image-anime shadow-2xl mb-[30px] scale-100 group-hover:translate-y-[-50px] transition-transform duration-300"
                                />
                                
                                {/* Product info overlay */}
                                <div className="absolute -bottom-[25px] gap-2 left-0 right-0 bg-[#BB8654] to-transparent p-1 h-[100px] border-3 border-[#CC9865] flex flex-col justify-center">
                                  <h4 className="text-xs font-bold text-white truncate bg-[#BC935E] py-2">
                                    {product.name}
                                  </h4>
                                  <hr className="border-[#9A7443] border-2" />
                                  <div className="flex items-center justify-between py-2 bg-[#BC935E]">
                                    <span className="text-xs font-bold text-yellow-300">
                                      ${product.price}
                                    </span>
                                    {product.popular && (
                                      <Star className="w-3 h-3 text-yellow-400" />
                                    )}
                                  </div>
                                </div>
                                
                                {/* Add to cart button */}
                                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <Button
                                    size="sm"
                                    className="w-6 h-6 p-0 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                                  >
                                    <ShoppingCart className="w-3 h-3" />
                                  </Button>
                                </div>
                                
                                {/* Spice level indicator */}
                                {product.spiceLevel >= 4 && (
                                  <div className="absolute top-1 left-1">
                                    <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                                      <Flame className="w-2 h-2 text-white" />
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Store Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-pink-50/50 via-white to-black/5 rounded-3xl p-8 border border-pink-200/30 shadow-xl backdrop-blur-sm">
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 anime-title">
              Ready to Explore More?
            </h3>
            <p className="text-lg text-gray-600 mb-6 pop-text max-w-2xl mx-auto">
              Discover our complete collection of premium ramen products and find your new favorite flavors.
            </p>
            <Link href="/products">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500"
              >
                Browse All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VirtualStore;