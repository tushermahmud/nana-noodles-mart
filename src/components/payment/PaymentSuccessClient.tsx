'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Mail, Receipt, Home, ShoppingBag, Truck } from 'lucide-react';
import { getPaymentTransactionDetails } from '@/fetchers/payments';

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const transaction_id = searchParams.get('transaction_id') || '';

  const [orderId, setOrderId] = useState('N/A');
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      if (!transaction_id) {
        setLoading(false);
        return;
      }

      try {
        const getTransactionDetails = await getPaymentTransactionDetails(transaction_id);
        const transactionDetails = getTransactionDetails?.data?.data ?? {};

        setOrderId(transactionDetails?.orderId ?? transaction_id);
        setAmount(transactionDetails?.amount ?? 0);
        setCurrency(transactionDetails?.currency ?? 'USD');
        setEmail(transactionDetails?.contact_email ?? '');
      } catch (error) {
        console.error('Error fetching transaction details:', error);
        setOrderId(transaction_id || 'N/A');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetails();
  }, [transaction_id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-10">
          <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">Payment Successful</h1>
          <p className="text-gray-600 text-lg">Thank you for your order! We’re getting it ready.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="lg:col-span-2">
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-pink-600" />
                  <span>Order Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-semibold text-gray-900 break-all">{loading ? 'Loading...' : orderId}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                    <p className="text-sm text-gray-600">Amount Paid</p>
                    <p className="font-semibold text-gray-900">{loading ? 'Loading...' : `${currency} ${amount.toFixed(2)}`}</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3">
                  <Truck className="w-5 h-5 text-green-700 mt-0.5" />
                  <div>
                    <p className="text-green-800 font-medium">Your order is being prepared</p>
                    <p className="text-green-700 text-sm">We’ll notify you when it’s on the way.</p>
                  </div>
                </div>

                {email && (
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-700 mt-0.5" />
                    <div>
                      <p className="text-blue-800 font-medium">Receipt sent</p>
                      <p className="text-blue-700 text-sm">A copy of your receipt was sent to {email}.</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="lg:col-span-1">
            <Card className="border border-gray-200 sticky top-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Next steps</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col space-y-4">
                <Link href="/products">
                  <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white flex items-center justify-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Continue Shopping
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <Home className="w-4 h-4" />
                    Go to Homepage
                  </Button>
                </Link>
                <div className="text-xs text-gray-500 text-center pt-2">Need help? Contact support with your order ID.</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


