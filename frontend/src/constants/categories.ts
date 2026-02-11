import type { AttractionCategory } from '../types';

export const CATEGORY_LABELS: Record<AttractionCategory, string> = {
  museum: 'Muzeu',
  park: 'Parc',
  restaurant: 'Restaurant',
  nightlife: 'Club',
  monument: 'Monument',
  church: 'Biserică',
  winery: 'Cramă',
  nature: 'Natură',
  theatre: 'Teatru',
  market: 'Piață',
};

export const CATEGORY_BADGE_COLORS: Record<AttractionCategory, string> = {
  museum: 'bg-amber-50 text-amber-600 border-amber-200',
  park: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  restaurant: 'bg-rose-50 text-rose-600 border-rose-200',
  nightlife: 'bg-violet-50 text-violet-600 border-violet-200',
  monument: 'bg-stone-50 text-stone-600 border-stone-200',
  church: 'bg-sky-50 text-sky-600 border-sky-200',
  winery: 'bg-purple-50 text-purple-600 border-purple-200',
  nature: 'bg-green-50 text-green-600 border-green-200',
  theatre: 'bg-pink-50 text-pink-600 border-pink-200',
  market: 'bg-orange-50 text-orange-600 border-orange-200',
};
