import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts up to 2 uppercase initials from a name (e.g. "Rajesh Kothari" -> "RK").
 */
export function getInitials(name: string): string {
  if (!name) return ""
  return name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

/**
 * Auto-generates a URL-friendly slug from a text string.
 */
export function generateSlug(val: string): string {
  return val
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
