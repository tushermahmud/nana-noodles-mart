'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CallToActionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

const CallToAction = ({
  title = 'Ready to Explore More?',
  subtitle = 'Discover our complete collection of premium ramen products and find your new favorite flavors.',
  buttonText = 'Browse All Products',
  buttonLink = '/products',
}: CallToActionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      viewport={{ once: true }}
      className="text-center mt-20"
    >
      <div className="bg-gradient-to-r from-pink-50/50 via-white to-black/5 rounded-3xl p-8 border border-pink-200/30 shadow-xl backdrop-blur-sm">
        <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 anime-title">{title}</h3>
        <p className="text-lg text-gray-600 mb-6 pop-text max-w-2xl mx-auto">{subtitle}</p>
        <Link href={buttonLink}>
          <Button
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500"
          >
            {buttonText}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default CallToAction;
