import type { Attraction, AttractionCategory, PriceLevel } from '../types';
import { attractions as initialData } from '../data';

const delay = (ms = 400) => new Promise<void>((r) => setTimeout(r, ms));

export const attractionService = {
  async getAll(filters?: { category?: AttractionCategory | 'all'; price?: PriceLevel | 'all'; search?: string; sort?: string }): Promise<Attraction[]> {
    await delay(); let result = [...initialData];
    if (filters?.category && filters.category !== 'all') result = result.filter((a) => a.category === filters.category);
    if (filters?.price && filters.price !== 'all') result = result.filter((a) => a.priceLevel === filters.price);
    if (filters?.search) { const q = filters.search.toLowerCase(); result = result.filter((a) => a.name.toLowerCase().includes(q) || a.shortDescription.toLowerCase().includes(q) || a.city.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q))); }
    switch (filters?.sort) { case 'reviews': result.sort((a, b) => b.reviewCount - a.reviewCount); break; case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break; default: result.sort((a, b) => b.rating - a.rating); }
    return result;
  },
  async getBySlug(slug: string): Promise<Attraction | undefined> { await delay(300); return initialData.find((a) => a.slug === slug); },
  async getFeatured(): Promise<Attraction[]> { await delay(300); return initialData.filter((a) => a.isFeatured); },
  async getNearby(slug: string, limit = 4): Promise<Attraction[]> { await delay(200); return initialData.filter((a) => a.slug !== slug).slice(0, limit); },
  async simulateError(): Promise<never> { await delay(300); throw new Error('Eroare internă a serverului — serviciul nu este disponibil.'); },
};
