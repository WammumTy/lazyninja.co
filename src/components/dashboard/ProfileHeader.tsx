import React from 'react';
import { Button } from '@/components/ui/button';

interface ProfileHeaderProps {
  profile: any;
  handleProfilePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, handleProfilePhotoChange }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-20 h-20 group cursor-pointer">
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
          onChange={handleProfilePhotoChange}
        />
        {profile.profile_photo_url ? (
          <img
            src={profile.profile_photo_url}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-2 border-gray-300"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full rounded-full bg-gray-300 text-white font-bold">
            {profile.business_name?.[0]?.toUpperCase() || '?'}
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center transition">
          <span className="text-white text-sm font-medium">Edit</span>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Hello, {profile.business_name || 'Business Name'}!</h2>
        <p className="text-gray-600">{profile.email || 'No email provided'}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
