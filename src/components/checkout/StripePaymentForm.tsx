"use client";

import { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface StripePaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

const StripePaymentForm = ({ 
  amount, 
  onSuccess, 
  onError, 
  isProcessing, 
  setIsProcessing 
}: StripePaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError('Payment system is not ready. Please try again.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Card information is required.');
      return;
    }

    setIsProcessing(true);
    setProcessing(true);
    setError(null);

    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'usd',
          metadata: {
            order_type: 'ramen_order',
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret, error: intentError } = await response.json();

      if (intentError) {
        throw new Error(intentError);
      }

      if (!clientSecret) {
        throw new Error('No client secret received');
      }

      // Confirm payment
      const { error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (paymentError) {
        setError(paymentError.message || 'Payment failed');
        onError(paymentError.message || 'Payment failed');
      } else {
        onSuccess();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed';
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Element */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Information *
        </label>
        <div className="p-4 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-pink-500 focus-within:border-transparent">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg"
        >
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-sm text-red-600">{error}</span>
        </motion.div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!stripe || processing || isProcessing}
        className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing || isProcessing ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing Payment...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Pay ${amount.toFixed(2)}</span>
          </div>
        )}
      </Button>

      {/* Security Notice */}
      <div className="text-center text-sm text-gray-500">
        <p>Your payment is secured by Stripe</p>
        <p className="mt-1">We never store your card details</p>
      </div>
    </form>
  );
};

export default StripePaymentForm;
