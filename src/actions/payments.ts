'use server';

import { revalidateTag } from 'next/cache';
import { PAYMENTS_ENDPOINTS } from '@/api/payments';
import { APIResponse } from '@/types/common';
import { PaymentIntent, PaymentMethod, PaymentDetails } from '@/types/payments';
import { performFetch } from '@/lib/apiUtils';

export async function createPaymentIntent(data: {
  amount: number;
  currency?: string;
  metadata?: Record<string, string>;
}) {
  const res = await performFetch<PaymentIntent>(PAYMENTS_ENDPOINTS.CREATE_PAYMENT_INTENT, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return res;
}

export async function confirmPayment(data: { paymentIntentId: string; orderId: string }) {
  const res = await performFetch<{
    success: boolean;
    orderId: string;
    transactionId: string;
  }>(PAYMENTS_ENDPOINTS.CONFIRM_PAYMENT, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (res?.success) {
    revalidateTag('getOrders');
    revalidateTag('getOrder');
    revalidateTag('getPaymentHistory');
  }

  return res;
}

export async function processRefund(data: {
  paymentIntentId: string;
  amount?: number;
  reason?: string;
}) {
  const res = await performFetch<{
    refundId: string;
    status: string;
    amount: number;
  }>(PAYMENTS_ENDPOINTS.PROCESS_REFUND, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (res?.success) {
    revalidateTag('getPaymentHistory');
    revalidateTag('getPaymentDetails');
  }

  return res;
}

export async function addPaymentMethod(data: { paymentMethodId: string; isDefault?: boolean }) {
  const res = await performFetch<PaymentMethod>(PAYMENTS_ENDPOINTS.ADD_PAYMENT_METHOD, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (res?.success) {
    revalidateTag('getPaymentMethods');
  }

  return res;
}

export async function removePaymentMethod(methodId: string) {
  const res = await performFetch<void>(PAYMENTS_ENDPOINTS.REMOVE_PAYMENT_METHOD(methodId), {
    method: 'DELETE',
  });

  if (res?.success) {
    revalidateTag('getPaymentMethods');
  }

  return res;
}

export async function setDefaultPaymentMethod(methodId: string) {
  const res = await performFetch<void>(PAYMENTS_ENDPOINTS.SET_DEFAULT_PAYMENT_METHOD(methodId), {
    method: 'PATCH',
    body: JSON.stringify({ isDefault: true }),
  });

  if (res?.success) {
    revalidateTag('getPaymentMethods');
  }

  return res;
}

export async function createSetupIntent() {
  const res = await performFetch<{ clientSecret: string }>(PAYMENTS_ENDPOINTS.CREATE_SETUP_INTENT, {
    method: 'POST',
  });

  return res;
}

export async function validateCoupon(code: string) {
  const res = await performFetch<{
    valid: boolean;
    discount: number;
    discountType: 'percentage' | 'fixed';
    description: string;
    expiresAt?: string;
  }>(PAYMENTS_ENDPOINTS.VALIDATE_COUPON, {
    method: 'POST',
    body: JSON.stringify({ code }),
  });

  return res;
}
