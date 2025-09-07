"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Star, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "../types";

interface ProductModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductModal = ({ isOpen, product, onClose, onAddToCart }: ProductModalProps) => {
  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  return (
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
                {product.name}
              </h2>
              <p className="text-lg font-semibold text-pink-600">
                ${product.price}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Product Image */}
          <div className="mb-6">
            <img
              src="/ramen-bowl-1.webp"
              alt={product.name}
              className="w-full h-64 object-contain rounded-lg bg-gradient-to-br from-amber-50 to-orange-100"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || "A delicious and authentic ramen experience that brings the taste of Japan to your kitchen. Made with premium ingredients and traditional techniques, this ramen offers a rich, flavorful broth and perfectly cooked noodles."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Category</h4>
                <p className="text-gray-600">{product.category}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Spice Level</h4>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Flame
                      key={i}
                      className={`w-4 h-4 ${
                        i < product.spiceLevel
                          ? "text-red-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {product.popular && (
              <div className="flex items-center text-yellow-600">
                <Star className="w-5 h-5 mr-2" />
                <span className="font-semibold">Popular Choice</span>
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="flex gap-4">
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="px-6 py-3 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-all duration-300"
            >
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;
