"use client";

import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripePaymentForm from './StripePaymentForm';

interface StripeCheckoutFormProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

const StripeCheckoutForm = ({ 
  amount, 
  onSuccess, 
  onError, 
  isProcessing, 
  setIsProcessing 
}: StripeCheckoutFormProps) => {
  const [isClient, setIsClient] = useState(false);
  const [stripePromise, setStripePromise] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Only load Stripe on the client side
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      setStripePromise(promise);
    }
  }, []);

  if (!isClient || !stripePromise) {
    return (
      <div className="space-y-4">
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm
        amount={amount}
        onSuccess={onSuccess}
        onError={onError}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
      />
    </Elements>
  );
};

export default StripeCheckoutForm;
