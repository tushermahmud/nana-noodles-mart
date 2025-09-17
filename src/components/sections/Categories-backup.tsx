'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, StarIcon, Flame, Leaf, Fish, Crown, ChefHat } from 'lucide-react';
import Image from 'next/image';
import { CATEGORY_COLORS } from '@/components/admin/CategoryCreateForm';
import Link from 'next/link';
import { Category } from '@/types/products';

interface CategoriesProps {
  categories: Category[];
}

const Categories = ({ categories }: CategoriesProps) => {
  const iconMap = {
    ChefHat,
    Flame,
    Leaf,
    Fish,
    Crown,
    Star: StarIcon,
  } as const;

  return (
    <section id="categories" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Categories Grid with enhanced layout */}
        <div className="relative">
          {/* Interactive store container */}
          <div className="rounded-3xl border border-pink-200/30 bg-transparent">
            <div className="relative">
              <div className="flex gap-6 overflow-x-auto scrollbar-hide">
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
                        className={`group hover:shadow-2xl transition-all duration-500 border-2 border-pink-200 overflow-hidden relative bg-gradient-to-br from-white via-pink-50/30 to-white backdrop-blur-sm cursor-pointer h-full anime-border`}
                      >
                        {/* Premium glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-200/20 via-transparent to-orange-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

                        <CardContent className="p-0 overflow-hidden relative z-10">
                          <div className="relative overflow-hidden">
                            {/* Category Image */}
                            <div className="w-full h-64 rounded-t-xl overflow-hidden relative">
                              <div className="w-full h-full relative overflow-hidden">
                                <Image
                                  src={category.imageUrl}
                                  alt={category.name}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                                  sizes="(max-width: 1024px) 100vw, 400px"
                                  priority={index < 3}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                                {/* Category Icon */}
                                {(() => {
                                  const colorDef = CATEGORY_COLORS.find(
                                    (c) => c.label === (category as any).color
                                  );
                                  return (
                                    <div
                                      className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-r ${colorDef?.bg ?? 'from-pink-500 to-pink-600'} rounded-full flex items-center justify-center shadow-xl border border-white/20 backdrop-blur-sm`}
                                    >
                                      {(() => {
                                        const IconComp =
                                          iconMap[category?.icon as keyof typeof iconMap] ||
                                          ChefHat;
                                        return <IconComp className="w-6 h-6 text-white" />;
                                      })()}
                                    </div>
                                  );
                                })()}

                                {/* Item Count */}
                                <div className="absolute bottom-[60px] right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-bold pop-text shadow-lg border border-gray-200">
                                  {category?.productsCount ?? 0} items
                                </div>
                              </div>
                            </div>

                            {/* Category Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                              <h3 className="text-xl font-bold text-white mb-2 anime-title">
                                {category.name}
                              </h3>

                              {/* CTA Button */}
                              {(() => {
                                const colorDef = CATEGORY_COLORS.find(
                                  (c) => c.label === (category as any).color
                                );
                                return (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className={`w-full border-2 border-white/30 bg-white/20 backdrop-blur-sm text-white hover:bg-gradient-to-r ${colorDef?.bg ?? 'from-pink-500 to-pink-600'} hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl`}
                                  >
                                    Explore {category?.name}
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                  </Button>
                                );
                              })()}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
