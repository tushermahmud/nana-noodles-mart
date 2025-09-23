import type { Metadata } from 'next';
import { Fredoka, Righteous, Rubik } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const fredoka = Fredoka({ subsets: ['latin'], weight: ['300','400','500','600','700'], variable: '--font-fredoka' });
const righteous = Righteous({ subsets: ['latin'], weight: '400', variable: '--font-righteous' });
const rubik = Rubik({ subsets: ['latin'], weight: ['300','400','500','600','700','800','900'], variable: '--font-rubik' });

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fredoka.variable} ${righteous.variable} ${rubik.variable}`}>
      <body suppressHydrationWarning>
          {children}
          <Toaster richColors closeButton position="top-right" />
      </body>
    </html>
  );
}
