"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChefHat, Flame, Leaf, Fish, Crown, Star } from "lucide-react";
import Link from "next/link";

interface CategoriesProps {
  onCategorySelect?: (categoryId: number | null) => void;
  selectedCategory?: number | null;
}

const categories = [
  {
    id: 1,
    name: "Signature Ramen",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&crop=center",
    count: 4,
    icon: ChefHat,
    color: "from-pink-500 to-orange-500",
    bgColor: "from-pink-100 to-orange-100",
    borderColor: "border-pink-200",
    popular: true,
    features: ["Tonkotsu", "Miso", "Shoyu", "Black Garlic"]
  },
  {
    id: 2,
    name: "Spicy Ramen",
    image: "https://images.unsplash.com/photo-1557872943-5a8ac4ddc5e9?w=400&h=300&fit=crop&crop=center",
    count: 3,
    icon: Flame,
    color: "from-red-500 to-orange-500",
    bgColor: "from-red-100 to-orange-100",
    borderColor: "border-red-200",
    popular: false,
    features: ["Extra Spicy", "Ghost Pepper", "Fire Ramen"]
  },
  {
    id: 3,
    name: "Vegetarian Ramen",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center",
    count: 2,
    icon: Leaf,
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-100 to-emerald-100",
    borderColor: "border-green-200",
    popular: false,
    features: ["Plant-based", "Organic", "Vegan"]
  },
  {
    id: 4,
    name: "Seafood Ramen",
    image: "https://images.unsplash.com/photo-1557872943-5a8ac4ddc5e9?w=400&h=300&fit=crop&crop=center",
    count: 3,
    icon: Fish,
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-100 to-cyan-100",
    borderColor: "border-blue-200",
    popular: true,
    features: ["Shrimp", "Crab", "Lobster"]
  },
  {
    id: 5,
    name: "Premium Ramen",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&crop=center",
    count: 2,
    icon: Crown,
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-100 to-pink-100",
    borderColor: "border-purple-200",
    popular: true,
    features: ["Wagyu", "Truffle", "Gold Leaf"]
  },
  {
    id: 6,
    name: "Fusion Ramen",
    image: "https://images.unsplash.com/photo-1557872943-5a8ac4ddc5e9?w=400&h=300&fit=crop&crop=center",
    count: 3,
    icon: Star,
    color: "from-yellow-500 to-orange-500",
    bgColor: "from-yellow-100 to-orange-100",
    borderColor: "border-yellow-200",
    popular: false,
    features: ["Korean BBQ", "Thai Curry", "Mexican"]
  }
];

const Categories = ({ onCategorySelect, selectedCategory }: CategoriesProps) => {
  const handleCategoryClick = (categoryId: number) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  return (
    <section id="categories" className="py-20 bg-gradient-to-br from-white via-pink-50/40 to-black/5 relative overflow-hidden">
      {/* Store background elements */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(236, 72, 153, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(236, 72, 153, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}></div>
        </div>
        
        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [0, 3, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-20 w-20 h-20 bg-gradient-to-r from-pink-200 to-orange-200 rounded-full opacity-20 blur-2xl"
        />
        <motion.div
          animate={{ y: [15, -15, 15], rotate: [0, -3, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 right-20 w-16 h-16 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full opacity-20 blur-2xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Store icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
            className="w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <span className="text-3xl">🏪</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 anime-title">
            Explore Our{" "}
            <span className="gradient-text anime-text-shadow">
              Store Categories
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto pop-text">
            Browse through our carefully curated categories, each offering a unique selection 
            of premium ramen products. Find your perfect match in every section.
          </p>
        </motion.div>

        {/* Categories Grid with enhanced layout */}
        <div className="relative">
          {/* Interactive store container */}
          <div className="bg-gradient-to-br from-pink-50/30 via-white to-black/5 rounded-3xl p-8 border border-pink-200/30 shadow-xl backdrop-blur-sm">
            {/* Interactive shelf navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg border border-pink-200/50">
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-pink-300 rounded-full"></div>
                <div className="w-3 h-3 bg-pink-200 rounded-full"></div>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex gap-6 overflow-x-auto py-6 px-2 scrollbar-hide">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex-shrink-0 w-80"
                  >
                    <Link href={`/categories/${category.id}`}>
                      <Card 
                        className={`group hover:shadow-2xl transition-all duration-500 border-2 border-pink-200 overflow-hidden relative bg-gradient-to-br from-white via-pink-50/30 to-white backdrop-blur-sm cursor-pointer h-full anime-border hover:scale-105 hover:-translate-y-2 ${
                          selectedCategory === category.id ? 'ring-4 ring-pink-500 ring-opacity-50 shadow-2xl' : ''
                        }`}
                      >
                        {/* Premium glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-200/20 via-transparent to-orange-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                        
                        <CardContent className="p-0 overflow-hidden relative z-10">
                          <div className="relative overflow-hidden">
                            {/* Category Image */}
                            <div className="w-full h-64 rounded-t-xl overflow-hidden relative">
                              <div className="w-full h-full relative overflow-hidden">
                                <img 
                                  src={category.image} 
                                  alt={category.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                
                                {/* Category Icon */}
                                <div className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center shadow-xl border border-white/20 backdrop-blur-sm`}>
                                  <category.icon className="w-6 h-6 text-white" />
                                </div>
                                
                                {/* Popular Badge */}
                                {category.popular && (
                                  <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                                    className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-xl border border-white/20 backdrop-blur-sm"
                                  >
                                    Popular
                                  </motion.div>
                                )}
                                
                                {/* Item Count */}
                                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-bold pop-text shadow-lg border border-gray-200">
                                  {category.count} items
                                </div>
                              </div>
                            </div>
                            
                            {/* Category Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                              <h3 className="text-xl font-bold text-white mb-2 anime-title">
                                {category.name}
                              </h3>
                              
                              {/* Features */}
                              <div className="flex flex-wrap gap-2 mb-3">
                                {category.features.map((feature, i) => (
                                  <span key={i} className={`px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full font-semibold border border-white/30 pop-text`}>
                                    {feature}
                                  </span>
                                ))}
                              </div>
                              
                              {/* CTA Button */}
                              <Button
                                variant="outline"
                                size="sm"
                                className={`w-full border-2 border-white/30 bg-white/20 backdrop-blur-sm text-white hover:bg-gradient-to-r ${category.color} hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl`}
                              >
                                Explore {category.name}
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Enhanced scroll indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                <div className="w-3 h-3 bg-pink-300 rounded-full"></div>
                <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
