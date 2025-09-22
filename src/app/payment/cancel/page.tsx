'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle, AlertTriangle, RotateCcw, ShoppingCart, Home } from 'lucide-react';

function Content() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason') || '';
  const lastOrderId = searchParams.get('orderId') || searchParams.get('order_id') || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="mx-auto w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">Payment Cancelled</h1>
          <p className="text-gray-600 text-lg">Your payment was not completed.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-pink-600" />
                <span>What happened?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  {reason
                    ? `Reason: ${reason}`
                    : 'You may have closed the window or returned from the payment provider.'}
                </p>
                {lastOrderId && (
                  <p className="text-sm text-yellow-800 mt-1">Reference: {lastOrderId}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <Link href="/checkout">
                  <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white flex items-center justify-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </Button>
                </Link>
                <Link href="/cart">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    View Cart
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Home className="w-4 h-4" />
                    Go Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={null}>
      <Content />
    </Suspense>
  );
}
