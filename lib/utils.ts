import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
}

export const yachtTypes = [
  'Motor Yacht',
  'Sailing Yacht',
  'Explorer Yacht',
  'Catamaran',
  'Gulet',
  'Other',
] as const;

export const crewPositions = [
  'Captain',
  'Chief Officer',
  'Second Officer',
  'Bosun',
  'Deckhand',
  'Chief Engineer',
  'Second Engineer',
  'Chief Stewardess',
  'Stewardess',
  'Chef',
  'Sous Chef',
  'Purser',
  'Dive Instructor',
  'Other',
] as const;

export type YachtType = (typeof yachtTypes)[number];
export type CrewPosition = (typeof crewPositions)[number];
