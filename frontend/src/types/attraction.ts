export type AttractionCategory =
  | 'museum' | 'park' | 'restaurant' | 'nightlife'
  | 'monument' | 'church' | 'winery' | 'nature'
  | 'theatre' | 'market';

export type PriceLevel = 'free' | '$' | '$$' | '$$$';

export interface Attraction {
  id: string;
  name: string;
  slug: string;
  category: AttractionCategory;
  description: string;
  shortDescription: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  images: string[];
  rating: number;
  reviewCount: number;
  priceLevel: PriceLevel;
  openingHours: string;
  phone?: string;
  website?: string;
  tags: string[];
  isFeatured: boolean;
}
