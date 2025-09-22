'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User as UserIcon, Edit, X } from 'lucide-react';
import ProfileEditForm from './ProfileEditForm';
import { User } from '@/types/auth';
import Image from 'next/image';


interface ProfileClientProps {
  user: User | null;
}

const ProfileClient = ({ user }: ProfileClientProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      {/* Profile Overview Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <UserIcon className="w-5 h-5 text-pink-600" />
            <span>Profile Information</span>
          </CardTitle>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <ProfileEditForm user={user} onCancel={() => setIsEditing(false)} />
          ) : (
            <div className="space-y-6">
              {/* Profile Image and Basic Info */}
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {user?.avatar_url ? (
                    <Image
                      src={user?.avatar_url || ''}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-pink-100 flex items-center justify-center">
                      <span className="text-2xl text-pink-600 font-bold">
                        {user?.first_name?.[0] || user?.name?.[0] || 'U'}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    { user?.first_name} { user?.last_name}
                  </h3>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">First Name</label>
                    <p className="text-lg text-gray-900">{user?.first_name ?? 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Name</label>
                    <p className="text-lg text-gray-900">{user?.last_name ?? 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-lg text-gray-900">{user?.email}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-lg text-gray-900">{user?.phone_number || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Role</label>
                    <p className="text-lg text-gray-900 capitalize">{user?.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Member Since</label>
                    <p className="text-lg text-gray-900">
                      {new Date(user?.created_at || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileClient;
