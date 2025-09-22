import { Suspense } from 'react';
import PaymentSuccessClient from '@/components/payment/PaymentSuccessClient';

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <PaymentSuccessClient />
    </Suspense>
  );
}
