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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addItem } = useCart();

  // Group products by category for different shelves
  const shelves = [
    {
      id: "popular",
      name: "Popular Favorites",
      description: "Our best-selling ramen varieties",
      icon: Star,
      color: "from-pink-500 to-orange-500",
        products: productsData.slice(0, 18)
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

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleModalAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
    closeModal();
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
                  
                  
                    {/* Shelf Grid - 6 baskets (3 products per basket) */}
                    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full mx-auto z-10 gap-y-5">
                      {Array.from({ length: 6 }, (_, index) => {
                        const firstProduct = shelf.products[index * 3];
                        const secondProduct = shelf.products[index * 3 + 1];
                        const thirdProduct = shelf.products[index * 3 + 2];
                        if (!firstProduct) return null;
                      return (
                      <motion.div
                        key={firstProduct.id}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="cursor-pointer"
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
                            
                            {/* Noodle Products inside basket */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div
                                whileHover={{ rotate: 0 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-full h-3/4 flex items-center justify-center"
                              >
                                {/* First Product */}
                                <div 
                                  className="relative w-1/3 h-full flex items-center justify-center group cursor-pointer"
                                  onClick={() => openModal(firstProduct)}
                                >
                                  <img
                                    src={"/ramen-bowl-1.webp"}
                                    alt={firstProduct.name}
                                    className="h-full object-contain image-anime shadow-2xl mb-[30px] scale-100 group-hover:translate-y-[-50px] transition-transform duration-300"
                                  />
                                  
                                  {/* First Product info overlay */}
                                  <div className="absolute -bottom-[25px] gap-2 left-0 right-0 bg-[#BB8654] to-transparent p-1 h-[100px] border-3 border-[#CC9865] flex flex-col justify-center">
                                    <h4 className="text-xs font-bold text-white truncate bg-[#BC935E] py-2">
                                      {firstProduct.name}
                                    </h4>
                                    <hr className="border-[#9A7443] border-2" />
                                    <div className="flex items-center justify-center py-2 bg-[#BC935E]">
                                      <span className="text-xs font-bold text-yellow-300">
                                        ${firstProduct.price}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  
                                </div>

                                {/* Second Product (if exists) */}
                                {secondProduct && (
                                  <div 
                                    className="relative w-1/3 h-full flex items-center justify-center group cursor-pointer"
                                    onClick={() => openModal(secondProduct)}
                                  >
                                    <img
                                      src={"/ramen-bowl-1.webp"}
                                      alt={secondProduct.name}
                                      className="h-full object-contain image-anime shadow-2xl mb-[30px] scale-100 group-hover:translate-y-[-50px] transition-transform duration-300"
                                    />
                                    
                                    {/* Second Product info overlay */}
                                    <div className="absolute -bottom-[25px] gap-2 left-0 right-0 bg-[#BB8654] to-transparent p-1 h-[100px] border-3 border-[#CC9865] flex flex-col justify-center">
                                      <h4 className="text-xs font-bold text-white truncate bg-[#BC935E] py-2">
                                        {secondProduct.name}
                                      </h4>
                                      <hr className="border-[#9A7443] border-2" />
                                      <div className="flex items-center justify-center py-2 bg-[#BC935E]">
                                        <span className="text-xs font-bold text-yellow-300">
                                          ${secondProduct.price}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Third Product (if exists) */}
                                {thirdProduct && (
                                  <div 
                                    className="relative w-1/3 h-full flex items-center justify-center group cursor-pointer"
                                    onClick={() => openModal(thirdProduct)}
                                  >
                                    <img
                                      src={"/ramen-bowl-1.webp"}
                                      alt={thirdProduct.name}
                                      className="h-full object-contain image-anime shadow-2xl mb-[30px] scale-100 group-hover:translate-y-[-50px] transition-transform duration-300"
                                    />
                                    
                                    {/* Third Product info overlay */}
                                    <div className="absolute -bottom-[25px] gap-2 left-0 right-0 bg-[#BB8654] to-transparent p-1 h-[100px] border-3 border-[#CC9865] flex flex-col justify-center">
                                      <h4 className="text-xs font-bold text-white truncate bg-[#BC935E] py-2">
                                        {thirdProduct.name}
                                      </h4>
                                      <hr className="border-[#9A7443] border-2" />
                                      <div className="flex items-center justify-center py-2 bg-[#BC935E]">
                                        <span className="text-xs font-bold text-yellow-300">
                                          ${thirdProduct.price}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      );
                    })}
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

      {/* Product Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-lg font-semibold text-pink-600">
                    ${selectedProduct.price}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* Product Image */}
              <div className="mb-6">
                <img
                  src={"/ramen-bowl-1.webp"}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-contain rounded-lg bg-gradient-to-br from-amber-50 to-orange-100"
                />
              </div>

              {/* Product Details */}
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedProduct.description || "A delicious and authentic ramen experience that brings the taste of Japan to your kitchen. Made with premium ingredients and traditional techniques, this ramen offers a rich, flavorful broth and perfectly cooked noodles."}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Category</h4>
                    <p className="text-gray-600">{selectedProduct.category}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Spice Level</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Flame
                          key={i}
                          className={`w-4 h-4 ${
                            i < selectedProduct.spiceLevel
                              ? "text-red-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {selectedProduct.popular && (
                  <div className="flex items-center text-yellow-600">
                    <Star className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Popular Choice</span>
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <div className="flex gap-4">
                <Button
                  onClick={() => handleModalAddToCart(selectedProduct)}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={closeModal}
                  variant="outline"
                  className="px-6 py-3 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-all duration-300"
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default VirtualStore;