'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/errorUtils';
import { requestPasswordReset } from '@/actions/auth';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await requestPasswordReset(email);
      if ((res as any)?.isSuccess || (res as any)?.success) {
        toast.success('If an account exists, a reset link has been sent to your email');
      } else {
        toast.message('Check your inbox if the email exists in our records');
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50/40 to-black/5">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">Forgot Password</h1>
            <p className="text-gray-600">Enter your email to receive a password reset link.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
            <form onSubmit={onSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Remembered?{' '}
                <Link href="/login" className="text-pink-600 hover:text-pink-700 font-semibold">
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


