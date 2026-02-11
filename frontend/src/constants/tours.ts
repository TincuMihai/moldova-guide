import type { TourTheme } from '../types';

export const THEME_LABELS: Record<TourTheme, string> = {
  cultural: 'Cultural',
  food: 'Gastronomic',
  wine: 'Vinuri',
  adventure: 'Aventură',
  history: 'Istorie',
  nature: 'Natură',
  architecture: 'Arhitectură',
  photography: 'Fotografie',
  nightlife: 'Nightlife',
};

export const THEME_BADGE_COLORS: Record<TourTheme, string> = {
  cultural: 'bg-violet-50 text-violet-600',
  food: 'bg-rose-50 text-rose-600',
  wine: 'bg-purple-50 text-purple-600',
  adventure: 'bg-amber-50 text-amber-600',
  history: 'bg-stone-100 text-stone-700',
  nature: 'bg-emerald-50 text-emerald-600',
  architecture: 'bg-sky-50 text-sky-600',
  photography: 'bg-pink-50 text-pink-600',
  nightlife: 'bg-indigo-50 text-indigo-600',
};

export const THEME_OPTIONS: { value: TourTheme | 'all'; label: string; emoji: string }[] = [
  { value: 'all', label: 'Toate', emoji: '🌍' },
  { value: 'history', label: 'Istorie', emoji: '🏛️' },
  { value: 'wine', label: 'Vinuri', emoji: '🍷' },
  { value: 'cultural', label: 'Cultural', emoji: '🎭' },
  { value: 'nature', label: 'Natură', emoji: '🌿' },
  { value: 'food', label: 'Gastronomic', emoji: '🍽️' },
  { value: 'adventure', label: 'Aventură', emoji: '⛰️' },
  { value: 'photography', label: 'Foto', emoji: '📷' },
  { value: 'architecture', label: 'Arhitectură', emoji: '🏗️' },
  { value: 'nightlife', label: 'Nightlife', emoji: '🌙' },
];
