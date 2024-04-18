import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';

export const RoundProfilePicture: React.FC<{ size?: string }> = ({ size }) => {
  return (
    <Avatar className={cn(size === 'big' ? 'w-64 h-64 rounded-full' : 'w-20 h-20 rounded-full')}>
      <AvatarImage src="https://github.com/mathoyer.png" alt="profile picture" />
      <AvatarFallback>...</AvatarFallback>
    </Avatar>
  );
};
