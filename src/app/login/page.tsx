import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoginClient from '@/components/auth/LoginClient';

type Props = {
  searchParams?: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const params = (await searchParams) || {};
  const nextUrl = params.next || '/';

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-orange-50 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoginClient nextUrl={nextUrl} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
