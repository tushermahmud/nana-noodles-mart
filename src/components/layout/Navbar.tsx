import NavbarClient from './NavbarClient';
import { Cart } from '@/types/cart';

export default function Navbar({ cartDetails }: { cartDetails?: Cart }) {
  return <NavbarClient cartDetails={cartDetails} />;
}
