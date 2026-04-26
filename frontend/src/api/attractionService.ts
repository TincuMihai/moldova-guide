import api from './axios';
import { ATTRACTIONS } from './endpoints';
import type { Attraction, AttractionCategory, PriceLevel } from '../types';

function mapAttraction(raw: any): Attraction {
  return {
    id: String(raw.id), name: raw.name, slug: raw.slug,
    category: raw.category as AttractionCategory,
    description: raw.description, shortDescription: raw.shortDescription,
    address: raw.address, city: raw.city, latitude: 0, longitude: 0,
    images: raw.images || [], rating: Number(raw.rating),
    reviewCount: raw.reviewCount, priceLevel: raw.priceLevel as PriceLevel,
    openingHours: raw.openingHours || '', phone: raw.phone || undefined,
    website: raw.website || undefined, tags: raw.tags || [],
    isFeatured: raw.isFeatured,
  };
}

export const attractionService = {
  async getAll(filters?: {
    category?: AttractionCategory | 'all'; price?: PriceLevel | 'all';
    search?: string; sort?: string;
  }): Promise<Attraction[]> {
    const { data } = await api.get(ATTRACTIONS.GET_ALL);
    let result = (data as any[]).map(mapAttraction);
    if (filters?.category && filters.category !== 'all')
      result = result.filter((a) => a.category === filters.category);
    if (filters?.price && filters.price !== 'all')
      result = result.filter((a) => a.priceLevel === filters.price);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((a) =>
        a.name.toLowerCase().includes(q) || a.shortDescription.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    switch (filters?.sort) {
      case 'reviews': result.sort((a, b) => b.reviewCount - a.reviewCount); break;
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  },
  async getBySlug(slug: string): Promise<Attraction | undefined> {
    try { const { data } = await api.get(ATTRACTIONS.GET_BY_SLUG(slug)); return mapAttraction(data); }
    catch { return undefined; }
  },
  async getFeatured(): Promise<Attraction[]> {
    const { data } = await api.get(ATTRACTIONS.GET_FEATURED);
    return (data as any[]).map(mapAttraction);
  },
  async getNearby(slug: string, limit = 4): Promise<Attraction[]> {
    const all = await this.getAll();
    return all.filter((a) => a.slug !== slug).slice(0, limit);
  },
};
