'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/errorUtils';
import { forgotPassword, resetPassword } from '@/actions/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [showReset, setShowReset] = useState(false);
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await forgotPassword(email);
      if (res?.isSuccess) {
        toast.success(res?.message ?? 'If an account exists, a reset code has been sent to your email');
        setShowReset(true);
      } else {
        toast.error(res?.message ?? 'Check your inbox if the email exists in our records');
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const onResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !otp || !password) {
      toast.error('Email, OTP and new password are required');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await resetPassword({ email, token: otp as string, password: password });
      if (res?.isSuccess) {
        toast.success(res?.message ?? 'Password has been reset successfully');
        router.push('/login');
      } else {
        toast.error(res?.message ?? 'Failed to reset password');
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">Forgot Password</h1>
        <p className="text-gray-600">Enter your email to receive a password reset link.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
        {!showReset ? (
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
            <Button type="submit" disabled={isSubmitting} className="w-full py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white disabled:opacity-50">
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </Button>
            <div className="text-center text-sm text-gray-600">
              Remembered?{' '}
              <Link href="/login" className="text-pink-600 hover:text-pink-700 font-semibold">Back to Login</Link>
            </div>
          </form>
        ) : (
          <form onSubmit={onResetSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter the code you received"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Re-enter new password"
                />
              </div>
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white disabled:opacity-50">
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </Button>
            <div className="text-center text-sm text-gray-600">
              Didn’t get a code?{' '}
              <button type="button" onClick={() => setShowReset(false)} className="text-pink-600 hover:text-pink-700 font-semibold">Resend</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}


