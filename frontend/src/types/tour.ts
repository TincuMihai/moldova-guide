import type { Guide } from './guide';

export type TourTheme =
  | 'cultural' | 'food' | 'wine' | 'adventure'
  | 'history' | 'nature' | 'architecture' | 'photography' | 'nightlife';

export interface TourStop {
  id: string;
  name: string;
  description: string;
  duration: string;
  image: string;
}

export interface Tour {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  images: string[];
  guide: Guide;
  duration: string;
  price: number;
  currency: string;
  maxParticipants: number;
  currentParticipants: number;
  language: string[];
  theme: TourTheme;
  difficulty: 'easy' | 'moderate' | 'challenging';
  rating: number;
  reviewCount: number;
  meetingPoint: string;
  included: string[];
  excluded: string[];
  stops: TourStop[];
  availableDates: string[];
  isFeatured: boolean;
  isActive: boolean;
}
