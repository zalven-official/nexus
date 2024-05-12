import CryptoJS from 'crypto-js';
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

/**
 * Executes a callback function when the Enter key is pressed without the Shift key.
 * Prevents the default behavior of the Enter key.
 * 
 * @param {KeyboardEvent} event - The keyboard event object.
 * @param {() => void} callback - The callback function to execute when Enter is pressed without Shift.
 * @returns {void}
 */
export function onSubmitEnter(event: KeyboardEvent, callback: () => void): void {
  if (!event.shiftKey) {
    callback();
  }
}

function token(): string {
  return stringToHash("2Po0hyFmqEGvHqAPYze9ogKvobG8PsgAklIHBcKEqR29KIut3fp1PBp74mTXP6c4C2yuVfCxg6ES4W85JE3BXl1ueqETAYw7EuFr7xKUIqoOOcqpC8U8xhmC9MCDVUIQIAZ8kTm7Ue8uDv3gPAWj8PvbpQ3SaLpcoBhkFhaAUZ2OtaGRjiDfWR5PBz20CZGOBYt3qzSTDOzuwL0YmEPQHvQXVJBrWuF0h3BLhLgGMlWGkJLZW28CJP6opLBvqM96ZmqHW9ULwmw7LYLKrp84lrdU5EYXGrhtLaeuakuRzC93GcqgWZSX957bHZ19dRioPrCWJOetGCDg5RFCFfJsdWbPrMCgcwKmasCqsP4TTSUqwiMF9Z9ad1jsHQflz82tUsZAqLYqWLzVwZFsCJPyaMaVIJ424p1974SKRugwOJOKCUQa5pROo6AoxJsH3C5c1l8p2MDgxwsYSjVwAtb5awpHo1Y0qVF90pGLmsE5qW9xKDm4TxMdsVeysHgb7yBL")
}

/**
 * Decrypts a string using AES encryption.
 * @param {string} value - The encrypted string to decrypt.
 * @param {string} salt - The salt used for encryption.
 * @returns {string} The decrypted string.
 */
export function decodeString(value: string): string {
  const bytes = CryptoJS.AES.decrypt(value, token());
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
}

/**
 * Encrypts a string using AES encryption.
 * @param {string} value - The string to encrypt.
 * @param {string} salt - The salt used for encryption.
 * @returns {string} The encrypted string.
 */
export function encodeString(value: string): string {
  const ciphertext = CryptoJS.AES.encrypt(value, token()).toString();
  return ciphertext;
}


/**
 * Converts a string to its SHA-256 hash value represented as a hexadecimal string.
 * @param {string} inputString The input string to be hashed.
 * @returns {string} The SHA-256 hash of the input string in hexadecimal format.
 */
export function stringToHash(inputString: string): string {
  const hash = CryptoJS.SHA256(inputString);
  return hash.toString(CryptoJS.enc.Hex);
}
