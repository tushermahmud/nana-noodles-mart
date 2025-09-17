import Navbar from '@/components/layout/Navbar';
import { getCurrentUser } from '@/fetchers/auth';
import { getCart } from '@/fetchers/cart';
import { Cart } from '@/types/cart';

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const loggedInUserRes = await getCurrentUser();
  const loggedInUser = loggedInUserRes?.data?.data ?? null;
  const getCartDetailsRes = await getCart(loggedInUser?.cart_id ?? '');
  const getCartDetails = getCartDetailsRes?.data?.data ?? {};
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          'linear-gradient(180deg, #FD7399 0%, rgba(253, 115, 153, 0.15) 35%, #FD7399 100%)',
      }}
    >
      {' '}
      <Navbar cartDetails={getCartDetails as Cart} />
      {children}
    </div>
  );
}
