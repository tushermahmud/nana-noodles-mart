"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-white via-pink-50/40 to-black/5 overflow-hidden">
      {/* Background Elements */}
      <motion.div
        animate={{ 
          x: [0, 100, 0],
          y: [0, -50, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear"
        }}
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-pink-300 to-orange-300 rounded-full opacity-30 blur-3xl"
      />
      
      <motion.div
        animate={{ 
          x: [0, -80, 0],
          y: [0, 60, 0],
          rotate: [0, -180, -360]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "linear"
        }}
        className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-orange-300 to-yellow-300 rounded-full opacity-30 blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Logo and Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl anime-pulse-glow anime-border">
                    <span className="text-white font-black text-3xl anime-title">N</span>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full anime-glow"
                  />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-gray-900 anime-title pop-text-shadow">
                    NANA'S
                  </h1>
                  <p className="text-lg text-gray-600 font-bold -mt-1 pop-text">NOODLE MART</p>
                </div>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-black text-gray-900 mb-6 anime-title"
            >
              Taste the{" "}
              <span className="gradient-text anime-text-shadow animate-pulse">
                Magic
              </span>
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed pop-text"
            >
              Discover our handcrafted noodles, authentic sauces, and family recipes passed down through generations. 
              Every bowl tells a story of love and tradition.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Button
                size="lg"
                variant="default"
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-bold rounded-full shadow-xl hover:shadow-2xl border-2 border-pink-500 hover:border-pink-600 anime-glow btn-hover-effect"
              >
                Explore Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-pink-500 bg-white text-pink-600 hover:bg-pink-500 hover:text-white px-8 py-4 text-lg font-bold rounded-full shadow-lg hover:shadow-xl anime-border btn-hover-effect"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Our Story
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
            >
              <div className="text-center">
                <div className="text-2xl font-black text-pink-600 anime-title">50+</div>
                <div className="text-sm text-gray-600 font-semibold pop-text">Years of Tradition</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-orange-600 anime-title">1000+</div>
                <div className="text-sm text-gray-600 font-semibold pop-text">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-yellow-600 anime-title">25+</div>
                <div className="text-sm text-gray-600 font-semibold pop-text">Unique Flavors</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
         <div className="relative w-full max-w-4xl mx-auto h-[600px] flex items-center justify-center">
  {/* Frame behind the design */}
  <div className="absolute inset-0">
    <Image
      src="/frame.png"
      alt="Frame"
      fill
      className="object-contain"
    />
  </div>

  {/* Animated Design on top of frame */}
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3, duration: 0.8 }}
    className="relative w-[80%] h-[80%] flex items-center justify-center"
  >
    {/* Background Gradient (animated) */}
    <motion.div
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 bg-gradient-to-br from-pink-200 via-orange-200 to-yellow-200 rounded-3xl shadow-2xl border-4 border-white"
    />

    {/* Overlay + Noodles + Text */}
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl"></div>

      <div className="text-center relative z-10">
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border-2 border-white/30"
        >
          <Image width={200} height={200} src="/Untitled design.gif" alt="Noodles" />
        </motion.div>

        <h3 className="text-3xl font-black text-gray-800 mb-2">Authentic Asian Flavors</h3>
        <p className="text-lg text-gray-700 font-semibold">Made with love & tradition</p>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full opacity-80 shadow-lg"
      />

      <motion.div
        animate={{ y: [10, -10, 10], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full opacity-80 shadow-lg"
      />

      {/* Special Offer Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute -bottom-6 -left-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl p-4 shadow-xl border-2 border-white/20 backdrop-blur-sm"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">🎉</span>
          </div>
          <div>
            <p className="text-sm font-bold text-white anime-title">Special Offer</p>
            <p className="text-xs text-white/90 pop-text">Free shipping on orders $50+</p>
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
</div>




        </div>
      </div>
    </section>
  );
};

export default Hero;
