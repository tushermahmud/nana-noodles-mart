import CheckoutClient from '@/components/checkout/CheckoutClient';
import { getCurrentUser } from '@/fetchers/auth';
import { getCart } from '@/fetchers/cart';
import { Cart } from '@/types/cart';

export default async function CheckoutPage() {
  const loggedInUserRes = await getCurrentUser();
  const loggedInUser = loggedInUserRes?.data?.data ?? null;
  const getCartDetailsRes = await getCart(loggedInUser?.cart_id ?? '');
  const getCartDetails = getCartDetailsRes?.data?.data ?? {};
  return (
    <div className="min-h-screen bg-white">
      <CheckoutClient cartDetails={getCartDetails as Cart} />
    </div>
  );
}
