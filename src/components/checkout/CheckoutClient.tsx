'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Truck, Shield, CheckCircle, MapPin, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { Cart } from '@/types/cart';
import { BASE_URL } from '@/config/env';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/errorUtils';
import { checkoutSchema, type CheckoutInput } from '@/schemas/checkout.schema';
import { createPaymentIntent } from '@/actions/payments';
import { z } from 'zod';

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default function CheckoutClient({ cartDetails }: { cartDetails: Cart }) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const [shippingMethod, setShippingMethod] = useState('standard');

  const shippingMethods = [
    { id: 'standard', name: 'Standard Shipping', price: 0, time: '3-5 business days', icon: Truck },
    {
      id: 'express',
      name: 'Express Shipping',
      price: 9.99,
      time: '1-2 business days',
      icon: Truck,
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      price: 19.99,
      time: 'Next business day',
      icon: Truck,
    },
  ];

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const getFieldError = (field: string) => {
    return fieldErrors[field] || null;
  };

  const handlePaymentSuccess = (url: string) => {
    setPaymentSuccess(true);
    setPaymentError(null);
    router.push(url ?? '');
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
    setIsProcessing(false);
  };

  const cartProducts = cartDetails?.cart ?? [];
  const subtotal =
    cartProducts?.reduce(
      (acc, item) => acc + Number(item?.product?.price) * Number(item?.quantity),
      0
    ) ?? 0;
  const shipping = shippingMethods.find((m) => m.id === shippingMethod)?.price || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const numberOfCartItems = cartProducts?.length < 1;

  const buildPayload = (): CheckoutInput => {
    const selected = shippingMethods.find((m) => m.id === shippingMethod);
    const payload: CheckoutInput = {
      products: cartProducts?.map((item) => ({
        name: item.product.name,
        price: Number(item.product.price),
        quantity: Number(item.quantity),
        description: item.product.description,
        product_id: item.product.id,
      })),
      contact_first_name: formData.firstName,
      contact_last_name: formData.lastName,
      contact_email: formData.email,
      contact_phone: formData.phone,
      shipping_address: formData.address,
      shipping_city: formData.city,
      shipping_state: formData.state,
      shipping_zip_code: formData.zipCode,
      shipping_method: shippingMethod,
      shipping_cost: selected?.price ?? 0,
      shipping_days: selected?.time ?? '',
    };
    return payload;
  };

  const submitPayment = async () => {
    try {
      setIsProcessing(true);
      setFieldErrors({});
      setPaymentError(null);

      const payload = buildPayload();
      const parsed = checkoutSchema.parse(payload);
      const res = await createPaymentIntent(parsed);
      if (!res?.isSuccess) {
        throw new Error(res?.message || 'Failed to create payment');
      }
      toast.success(res?.message || 'Payment created successfully');
      handlePaymentSuccess(res?.data?.data?.session?.url ?? '');
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          const path = issue.path.join('.');
          errors[path] = issue.message;
        });
        setFieldErrors(errors);
        toast.error('Please fix the form errors below');
      } else {
        const msg = getErrorMessage(err);
        setPaymentError(msg);
        toast.error(msg);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (numberOfCartItems) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Truck className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 max-w-md">
            You need to add items to your cart before proceeding to checkout.
          </p>
          <Link href="/products">
            <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3">
              Browse Products
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Checkout</h1>
              <p className="text-lg text-gray-600">
                Complete your order and enjoy your delicious ramen!
              </p>
            </div>
            <Link href="/cart">
              <Button variant="outline" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Cart</span>
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-8">
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-pink-600" />
                      <span>Contact Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            getFieldError('contact_first_name')
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                        />
                        {getFieldError('contact_first_name') && (
                          <p className="text-red-500 text-sm mt-1">
                            {getFieldError('contact_first_name')}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            getFieldError('contact_last_name')
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                        />
                        {getFieldError('contact_last_name') && (
                          <p className="text-red-500 text-sm mt-1">
                            {getFieldError('contact_last_name')}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            getFieldError('contact_email') ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {getFieldError('contact_email') && (
                          <p className="text-red-500 text-sm mt-1">
                            {getFieldError('contact_email')}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            getFieldError('contact_phone') ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {getFieldError('contact_phone') && (
                          <p className="text-red-500 text-sm mt-1">
                            {getFieldError('contact_phone')}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-pink-600" />
                      <span>Shipping Address</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                          getFieldError('shipping_address') ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {getFieldError('shipping_address') && (
                        <p className="text-red-500 text-sm mt-1">
                          {getFieldError('shipping_address')}
                        </p>
                      )}
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            getFieldError('shipping_city') ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {getFieldError('shipping_city') && (
                          <p className="text-red-500 text-sm mt-1">
                            {getFieldError('shipping_city')}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            getFieldError('shipping_state') ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {getFieldError('shipping_state') && (
                          <p className="text-red-500 text-sm mt-1">
                            {getFieldError('shipping_state')}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                            getFieldError('shipping_zip_code')
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                        />
                        {getFieldError('shipping_zip_code') && (
                          <p className="text-red-500 text-sm mt-1">
                            {getFieldError('shipping_zip_code')}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Truck className="w-5 h-5 text-pink-600" />
                      <span>Shipping Method</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {shippingMethods.map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${shippingMethod === method.id ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-pink-300'}`}
                        >
                          <input
                            type="radio"
                            name="shipping"
                            value={method.id}
                            checked={shippingMethod === method.id}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            className="mr-3 text-pink-600 focus:ring-pink-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-semibold text-gray-900">{method.name}</h3>
                                <p className="text-sm text-gray-600">{method.time}</p>
                              </div>
                              <span className="font-bold text-gray-900">
                                {method.price === 0 ? 'Free' : `$${method.price.toFixed(2)}`}
                              </span>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-pink-600" />
                      <span>Payment Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-3">
                      <Button
                        disabled={isProcessing}
                        onClick={submitPayment}
                        className="bg-pink-600 hover:bg-pink-700 text-white"
                      >
                        {isProcessing ? 'Processing...' : 'Pay Now'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handlePaymentError('Payment failed. Try again.')}
                      >
                        Simulate Error
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-8 border border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">
                    Items ({cartDetails?.cart?.length})
                  </h3>
                  {cartProducts.length > 0 &&
                    cartProducts?.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item?.product?.imageUrl}
                            alt={item?.product?.name}
                            className="w-full h-full object-cover"
                            width={80}
                            height={80}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {item?.product?.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Qty: {Number(item?.quantity)} * ${item?.product?.price}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          ${(Number(item?.product?.price) * Number(item?.quantity)).toFixed(2)}
                        </span>
                      </div>
                    ))}
                </div>

                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {paymentSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-4"
                  >
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-800 font-medium">Payment Successful!</span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">Redirecting to homepage...</p>
                  </motion.div>
                )}

                {paymentError && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-50 border border-red-200 rounded-lg p-4"
                  >
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-800 font-medium">Payment Failed</span>
                    </div>
                    <p className="text-red-700 text-sm mt-1">{paymentError}</p>
                  </motion.div>
                )}

                {/* Product validation errors */}
                {Object.keys(fieldErrors).some((key) => key.startsWith('products')) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-50 border border-red-200 rounded-lg p-4"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-800 font-medium">Product Errors</span>
                    </div>
                    <div className="space-y-1">
                      {Object.entries(fieldErrors)
                        .filter(([key]) => key.startsWith('products'))
                        .map(([key, error]) => (
                          <p key={key} className="text-red-700 text-sm">
                            {error}
                          </p>
                        ))}
                    </div>
                  </motion.div>
                )}

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Secure Checkout</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Your payment information is encrypted and secure. We never store your card
                    details.
                  </p>
                </div>

                <div className="text-center text-sm text-gray-500 space-y-2">
                  <p>By placing your order, you agree to our Terms of Service</p>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span>Fast Delivery</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
