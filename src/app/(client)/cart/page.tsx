import CartClient from '@/components/cart/CartClient';
import { getCart } from '@/fetchers/cart';
import { getCurrentUser } from '@/fetchers/auth';
import { Cart } from '@/types/cart';

export default async function CartPage() {
  const loggedInUserRes = await getCurrentUser();
  const loggedInUser = loggedInUserRes?.data?.data ?? null;
  const getCartDetailsRes = await getCart(loggedInUser?.cart_id ?? "");
  const getCartDetails = getCartDetailsRes?.data?.data ?? {};
  return (
    <div className="min-h-screen bg-white">
      <CartClient cartDetails={getCartDetails as Cart}/>
    </div>
  );
}
