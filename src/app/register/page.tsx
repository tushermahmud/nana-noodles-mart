"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, ChefHat, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Registration attempt:", formData);
  };

  const isPasswordValid = formData.password.length >= 8;
  const isConfirmPasswordValid = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-orange-50 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Registration Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center lg:justify-start"
            >
              <Card className="w-full max-w-md border-2 border-pink-100 bg-white/90 backdrop-blur-sm anime-border">
                <CardHeader className="text-center pb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                  >
                    <ChefHat className="w-10 h-10 text-white" />
                  </motion.div>
                  <CardTitle className="text-3xl font-black text-gray-900 anime-title">
                    Join Our Family!
                  </CardTitle>
                  <p className="text-gray-600 mt-2 pop-text">
                    Create your Nana's Noodle Mart account
                  </p>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 pop-text">
                          First Name
                        </label>
                        <div className="relative">
                          <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                            placeholder="First name"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 pop-text">
                          Last Name
                        </label>
                        <div className="relative">
                          <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                            placeholder="Last name"
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <label className="block text-sm font-bold text-gray-700 mb-2 pop-text">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your email"
                        />
                      </div>
                    </motion.div>

                    {/* Phone Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <label className="block text-sm font-bold text-gray-700 mb-2 pop-text">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </motion.div>

                    {/* Password Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <label className="block text-sm font-bold text-gray-700 mb-2 pop-text">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                          placeholder="Create a password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${isPasswordValid ? 'bg-green-500' : 'bg-gray-300'}`}>
                          {isPasswordValid && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className={`text-xs ${isPasswordValid ? 'text-green-600' : 'text-gray-500'} pop-text`}>
                          At least 8 characters
                        </span>
                      </div>
                    </motion.div>

                    {/* Confirm Password Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      <label className="block text-sm font-bold text-gray-700 mb-2 pop-text">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${isConfirmPasswordValid ? 'bg-green-500' : 'bg-gray-300'}`}>
                          {isConfirmPasswordValid && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className={`text-xs ${isConfirmPasswordValid ? 'text-green-600' : 'text-gray-500'} pop-text`}>
                          Passwords match
                        </span>
                      </div>
                    </motion.div>

                    {/* Terms and Conditions */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="flex items-start space-x-3"
                    >
                      <input
                        type="checkbox"
                        required
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500 mt-1"
                      />
                      <label className="text-sm text-gray-600 pop-text">
                        I agree to the{" "}
                        <Link href="/terms" className="text-pink-600 hover:text-pink-700 font-semibold">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-pink-600 hover:text-pink-700 font-semibold">
                          Privacy Policy
                        </Link>
                      </label>
                    </motion.div>

                    {/* Register Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Create Account
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </motion.div>

                    

                    

                    {/* Sign In Link */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      className="text-center"
                    >
                      <p className="text-gray-600 pop-text">
                        Already have an account?{" "}
                        <Link href="/login" className="text-pink-600 hover:text-pink-700 font-bold pop-text">
                          Sign in here
                        </Link>
                      </p>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Side - Visual Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Main Content */}
                <div className="text-center lg:text-left">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-5xl md:text-7xl font-black text-gray-900 mb-6 anime-title"
                  >
                    Join{" "}
                    <span className="gradient-text anime-text-shadow">
                      Nana's Family
                    </span>
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-xl text-gray-600 mb-8 pop-text"
                  >
                    Become part of our ramen-loving community! Create your account to unlock 
                    exclusive features, track your orders, and get personalized recommendations.
                  </motion.p>

                  {/* Benefits */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🎯</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 anime-title">Personalized Experience</h3>
                        <p className="text-gray-600 text-sm pop-text">Get recommendations based on your taste</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">📱</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 anime-title">Order Tracking</h3>
                        <p className="text-gray-600 text-sm pop-text">Real-time updates on your ramen journey</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">💎</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 anime-title">VIP Benefits</h3>
                        <p className="text-gray-600 text-sm pop-text">Early access to new flavors and special offers</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🔥</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 anime-title">Exclusive Content</h3>
                        <p className="text-gray-600 text-sm pop-text">Ramen recipes, tips, and behind-the-scenes</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-20 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-60"
                />
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-20 left-20 w-12 h-12 bg-orange-200 rounded-full opacity-60"
                />
                <motion.div
                  animate={{ y: [-15, 15, -15] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-40 left-10 w-8 h-8 bg-yellow-200 rounded-full opacity-60"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RegisterPage;
