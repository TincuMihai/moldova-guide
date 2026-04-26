import api from './axios';
import { TOURS } from './endpoints';
import type { Tour } from '../types';

function mapTour(raw: any): Tour {
  return {
    id: String(raw.id), title: raw.title, slug: raw.slug,
    description: raw.description || '', shortDescription: raw.shortDescription || '',
    images: raw.images || [],
    guide: { id: String(raw.guide?.id || ''), name: raw.guide?.name || '', avatar: raw.guide?.avatar || '',
      bio: '', languages: [], rating: 0, reviewCount: 0, tourCount: 0, certifications: [], joinedDate: '' },
    duration: raw.duration, price: Number(raw.price), currency: raw.currency,
    maxParticipants: raw.maxParticipants, currentParticipants: raw.currentParticipants,
    language: raw.language || [], theme: raw.theme, difficulty: raw.difficulty,
    rating: Number(raw.rating), reviewCount: raw.reviewCount,
    meetingPoint: '', included: [], excluded: [],
    stops: (raw.stops || []).map((s: any) => ({ id: String(Math.random()), name: s.name, description: s.description || '', duration: s.duration, image: '' })),
    availableDates: [], isFeatured: raw.isFeatured, isActive: raw.isActive,
  };
}

export const tourService = {
  async getAll(f?: { theme?: string; duration?: string; language?: string; search?: string; sort?: string }): Promise<Tour[]> {
    const { data } = await api.get(TOURS.GET_ALL);
    let result = (data as any[]).map(mapTour);
    if (f?.theme && f.theme !== 'all') result = result.filter((t) => t.theme === f.theme);
    if (f?.language && f.language !== 'all') result = result.filter((t) => t.language.includes(f.language!));
    if (f?.duration && f.duration !== 'all')
      result = result.filter((t) => { const h = parseInt(t.duration); return f.duration === 'short' ? h <= 3 : f.duration === 'half' ? h >= 4 && h <= 6 : h >= 7; });
    if (f?.search) { const q = f.search.toLowerCase(); result = result.filter((t) => t.title.toLowerCase().includes(q) || t.shortDescription.toLowerCase().includes(q)); }
    switch (f?.sort) { case 'price_low': result.sort((a, b) => a.price - b.price); break; case 'price_high': result.sort((a, b) => b.price - a.price); break; case 'reviews': result.sort((a, b) => b.reviewCount - a.reviewCount); break; default: result.sort((a, b) => b.rating - a.rating); }
    return result;
  },
  async getBySlug(slug: string): Promise<Tour | undefined> { try { const { data } = await api.get(TOURS.GET_BY_SLUG(slug)); return mapTour(data); } catch { return undefined; } },
  async getByGuide(guideName: string): Promise<Tour[]> { const all = await this.getAll(); return all.filter((t) => t.guide.name === guideName); },
  async create(data: Omit<Tour, 'id' | 'slug' | 'rating' | 'reviewCount'>): Promise<Tour> {
    const guideId = Number(data.guide?.id) || 0;
    const { data: resp } = await api.post(TOURS.CREATE(guideId), { title: data.title, shortDescription: data.shortDescription, description: data.description, theme: data.theme, duration: data.duration, difficulty: data.difficulty, language: data.language, price: data.price, currency: data.currency, maxParticipants: data.maxParticipants, images: data.images, stops: data.stops?.map((s) => ({ name: s.name, description: s.description, duration: s.duration })) });
    return resp;
  },
  async update(id: string, updates: Partial<Tour>): Promise<Tour> { const { data } = await api.put(TOURS.GET_BY_SLUG(id), updates); return data; },
  async delete(id: string): Promise<void> { await api.delete(TOURS.DELETE(Number(id))); },
  async toggleActive(id: string): Promise<Tour> { const { data } = await api.put(TOURS.TOGGLE_ACTIVE(Number(id))); return data; },
};
