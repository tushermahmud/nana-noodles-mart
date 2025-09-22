import { User } from '@/types/auth';
import NavbarClient from './NavbarClient';
import { Cart } from '@/types/cart';

export default function Navbar({
  cartDetails,
  loggedInUser,
}: {
  cartDetails?: Cart;
  loggedInUser?: User | null;
}) {
  return <NavbarClient cartDetails={cartDetails} loggedInUser={loggedInUser} />;
}
