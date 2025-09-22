import { getCurrentUser } from '@/fetchers/auth';
import { redirect } from 'next/navigation';
import ProfileClient from '@/components/profile/ProfileClient';

export default async function ProfilePage() {
  // Fetch current user data on the server
  const userRes = await getCurrentUser();

  const user = userRes?.data?.data ?? null;

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
        </div>

        {/* Profile Content */}
        <ProfileClient user={user} />
      </div>
    </div>
  );
}
