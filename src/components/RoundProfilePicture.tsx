import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const RoundProfilePicture: React.FC<{ size?: number }> = ({ size = 20 }) => {
  return (
    <Avatar className={`w-${size} h-${size} rounded-full`}>
      <AvatarImage src="https://github.com/mathoyer.png" alt="profile picture" />
      <AvatarFallback>...</AvatarFallback>
    </Avatar>
  );
};
