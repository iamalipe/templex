import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function saltAndHashPassword(password: string) {
  const saltRounds = 10; // Adjust the cost factor according to your security requirements
  const salt = bcrypt.genSaltSync(saltRounds); // Synchronously generate a salt
  const hash = bcrypt.hashSync(password, salt); // Synchronously hash the password
  return hash; // Return the hash directly as a string
}

export function generateOTP(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function nameInitials(name: string, capital = true) {
  // Split the input string by spaces, remove empty strings and filter out undefined names
  const nameParts = name.trim().split(/\s+/).filter(Boolean);

  // Get the first letter of the first and last elements of the array
  const initials =
    nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
      : nameParts[0][0];

  // Return either capitalized or lowercase initials based on the capital flag
  return capital ? initials.toUpperCase() : initials.toLowerCase();
}

export function randomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}