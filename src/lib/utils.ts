import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatToRand = (value: number) => {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatToPercentage = (value: number) => {
  return new Intl.NumberFormat("en-ZA", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value / 100);
};

export const getDomain = () => {
  if (process.env.NODE_ENV === "production") {
    // Use the domain set in the Vercel environment variable
    return process.env.NEXT_PUBLIC_DOMAIN;
  }
  // Use localhost for development
  return process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";
};
