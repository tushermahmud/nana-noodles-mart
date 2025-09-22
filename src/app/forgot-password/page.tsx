export const dynamic = 'force-dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ForgotPasswordClient from '@/components/auth/ForgotPasswordClient';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50/40 to-black/5">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <ForgotPasswordClient />
      </main>
      <Footer />
    </div>
  );
}
