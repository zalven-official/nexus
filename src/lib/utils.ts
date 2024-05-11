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

/**
 * Converts a given Date object into a human-readable relative time string.
 * The output format mimics the relative time display used by social media platforms.
 * @param {Date} date The Date object representing the timestamp to convert.
 * @returns {string} A human-readable relative time string (e.g., "just now", "5 minutes ago", "yesterday", etc.).
 */
export function readableTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return 'just now';
  } else if (minutes === 1) {
    return 'a minute ago';
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours === 1) {
    return 'an hour ago';
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days === 1) {
    return 'yesterday';
  } else if (days < 7) {
    return `${days} days ago`;
  } else {
    // For dates older than a week, return a formatted date string
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
}
