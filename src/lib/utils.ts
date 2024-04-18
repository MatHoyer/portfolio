import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (key: string) => {
  return key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
};
