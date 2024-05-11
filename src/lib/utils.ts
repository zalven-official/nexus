import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// This is for ShadCN
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a fallback name based on the provided full name.
 * The fallback name consists of the initial letters of the first one or two words.
 * @param fullName The full name from which to generate the fallback.
 * @returns The generated fallback name.
 */
export function generateFallbackName(fullName: string): string {
  const words = fullName.split(' ');
  let fallback = '';
  for (let index = 0; index < words.length && fallback.length < 2; index++) {
    const word = words[index];
    fallback += word.charAt(0);
    if (fallback.length >= 2) {
      break;
    }
    if (word.length > 1) {
      fallback += word.charAt(1);
    }
  }
  return fallback.toUpperCase();
}