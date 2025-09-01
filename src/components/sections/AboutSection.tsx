"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Award, Heart, Clock, Star, Leaf, Zap } from "lucide-react";

const AboutSection = () => {
  const stats = [
    {
      icon: Users,
      number: "50+",
      label: "Years of Tradition",
      color: "text-gray-700"
    },
    {
      icon: Award,
      number: "25+",
      label: "Awards Won",
      color: "text-gray-700"
    },
    {
      icon: Heart,
      number: "1000+",
      label: "Happy Customers",
      color: "text-gray-700"
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Customer Support",
      color: "text-gray-700"
    }
  ];

  const values = [
    {
      title: "Authenticity",
      description: "We stay true to traditional recipes while embracing modern techniques.",
      icon: Star,
      color: "text-yellow-600"
    },
    {
      title: "Quality",
      description: "Only the finest ingredients make it into our kitchen.",
      icon: Leaf,
      color: "text-green-600"
    },
    {
      title: "Innovation",
      description: "Constantly exploring new flavors and fusion combinations.",
      icon: Zap,
      color: "text-blue-600"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                Our{" "}
                <span className="text-gray-600">
                  Story
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Founded in 1974 by Grandma Nana, our noodle mart began as a small family kitchen 
                serving authentic ramen to our local community. What started with a simple dream 
                of sharing love through food has grown into a beloved institution.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we continue Grandma Nana's legacy by crafting each bowl with the same 
                passion and attention to detail. Our recipes have been passed down through 
                generations, ensuring that every bite carries the warmth and love of family tradition.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6 mb-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <div className={`text-2xl font-black ${stat.color}`}>{stat.number}</div>
                  <div className="text-sm text-gray-600 font-semibold">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                variant="default"
                className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Learn More About Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border-2 border-white/30"
                  >
                    <span className="text-6xl">👵</span>
                  </motion.div>
                  <h3 className="text-2xl font-black text-gray-800 mb-2">Grandma Nana's Kitchen</h3>
                  <p className="text-lg text-gray-700 font-semibold">Where love meets tradition</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ 
                y: [-10, 10, -10],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-gray-400 rounded-full opacity-80 shadow-lg"
            />
            
            <motion.div
              animate={{ 
                y: [10, -10, 10],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -right-8 w-12 h-12 bg-gray-500 rounded-full opacity-80 shadow-lg"
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
            <span className="text-gray-600">
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
              <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center`}>
                <value.icon className={`w-8 h-8 ${value.color}`} />
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
