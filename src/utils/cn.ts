import { twMerge } from "tailwind-merge";
import { ClassValue } from "clsx";
import clsx from "clsx";

// This function is a wrapper around clsx that also applies tailwindcss classes
export function cn(...inputs:ClassValue[]) {
  return twMerge(clsx(...inputs))
}
