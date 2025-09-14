import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { CartProvider } from '@/contexts/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Nana's Noodle Mart - Authentic Ramen & Asian Cuisine",
  description:
    "Discover authentic ramen and Asian cuisine at Nana's Noodle Mart. Premium ingredients, traditional recipes, and unforgettable flavors since 1974.",
  keywords: 'ramen, noodle, Asian cuisine, authentic, traditional, food, restaurant',
  authors: [{ name: "Nana's Noodle Mart" }],
  openGraph: {
    title: "Nana's Noodle Mart - Authentic Ramen & Asian Cuisine",
    description:
      "Discover authentic ramen and Asian cuisine at Nana's Noodle Mart. Premium ingredients, traditional recipes, and unforgettable flavors since 1974.",
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nana's Noodle Mart - Authentic Ramen & Asian Cuisine",
    description:
      "Discover authentic ramen and Asian cuisine at Nana's Noodle Mart. Premium ingredients, traditional recipes, and unforgettable flavors since 1974.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CartProvider>
          {children}
          <Toaster richColors closeButton position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}
