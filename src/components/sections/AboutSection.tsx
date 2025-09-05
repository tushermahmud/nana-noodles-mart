"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Award, Heart, Clock, Star, Leaf, Zap } from "lucide-react";

const AboutSection = () => {
  const stats = [
    {
      number: "50+",
      label: "Years of Tradition",
      color: "text-pink-600"
    },
    {
      number: "1000+",
      label: "Happy Customers",
      color: "text-orange-600"
    },
    {
      number: "25+",
      label: "Unique Flavors",
      color: "text-yellow-600"
    }
  ];

  const values = [
    {
      title: "Premium Ingredients",
      description: "We source only the finest, freshest ingredients from trusted local suppliers.",
      icon: "🌾"
    },
    {
      title: "Traditional Methods",
      description: "Every noodle is created using time-honored techniques passed down through generations.",
      icon: "🍜"
    },
    {
      title: "Made with Love",
      description: "Every dish is prepared with the same care and attention that Nana put into her cooking.",
      icon: "❤️"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white via-pink-50/40 to-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Our Story Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button
                variant="outline"
                size="sm"
                className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors rounded-full px-4 py-2"
              >
                <Clock className="w-4 h-4 mr-2" />
                Our Story
              </Button>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                A Family Since{" "}
                <span className="text-gray-900">
                  1973
                </span>
              </h2>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <p className="text-lg text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className={`text-3xl font-black ${stat.color} mb-2`}>{stat.number}</div>
                  <div className="text-sm text-gray-900 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                variant="default"
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Visual Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative w-full h-96 lg:h-[500px] bg-gray-200 rounded-3xl overflow-hidden shadow-lg"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md"
                  >
                    <span className="text-6xl">👵</span>
                  </motion.div>
                  <h3 className="text-2xl font-black text-gray-800 mb-2">Nana's Kitchen</h3>
                  <p className="text-lg text-gray-700 font-medium">Where tradition meets taste</p>
                </div>
              </div>
            </motion.div>

            {/* Quote Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -left-8 w-80 p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs">💬</span>
                </div>
                <div>
                  <p className="text-gray-900 font-medium leading-relaxed">
                    "The secret ingredient is always love. That's what makes our noodles special." -Nana Chen
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Background Elements */}
            <motion.div
              animate={{ 
                y: [-10, 10, -10],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 w-16 h-16 bg-gray-300 rounded-full opacity-60"
            />
            
            <motion.div
              animate={{ 
                y: [10, -10, 10],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 w-12 h-12 bg-gray-400 rounded-full opacity-60"
            />
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Our{" "}
            <span className="text-gray-900">
              Values
            </span>
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These core principles guide everything we do, from selecting ingredients to serving our customers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white shadow-md flex items-center justify-center">
                <span className="text-3xl">{value.icon}</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
