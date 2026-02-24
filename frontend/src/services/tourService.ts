import type { Tour } from '../types';
import { tours as initialTours } from '../data';

const KEY = 'moldovaguide_tours';
function getStored(): Tour[] {
  const s = localStorage.getItem(KEY); if (s) return JSON.parse(s);
  localStorage.setItem(KEY, JSON.stringify(initialTours)); return [...initialTours];
}
function saveAll(t: Tour[]) { localStorage.setItem(KEY, JSON.stringify(t)); }
const delay = (ms = 400) => new Promise<void>((r) => setTimeout(r, ms));

export const tourService = {
  async getAll(f?: { theme?: string; duration?: string; language?: string; search?: string; sort?: string }): Promise<Tour[]> {
    await delay(); let result = getStored();
    if (f?.theme && f.theme !== 'all') result = result.filter((t) => t.theme === f.theme);
    if (f?.language && f.language !== 'all') result = result.filter((t) => t.language.includes(f.language!));
    if (f?.duration && f.duration !== 'all') result = result.filter((t) => { const h = parseInt(t.duration); return f.duration === 'short' ? h <= 3 : f.duration === 'half' ? h >= 4 && h <= 6 : h >= 7; });
    if (f?.search) { const q = f.search.toLowerCase(); result = result.filter((t) => t.title.toLowerCase().includes(q) || t.shortDescription.toLowerCase().includes(q)); }
    switch (f?.sort) { case 'price_low': result.sort((a, b) => a.price - b.price); break; case 'price_high': result.sort((a, b) => b.price - a.price); break; case 'reviews': result.sort((a, b) => b.reviewCount - a.reviewCount); break; default: result.sort((a, b) => b.rating - a.rating); }
    return result;
  },
  async getBySlug(slug: string): Promise<Tour | undefined> { await delay(300); return getStored().find((t) => t.slug === slug); },
  async getByGuide(guideName: string): Promise<Tour[]> { await delay(300); return getStored().filter((t) => t.guide.name === guideName); },
  async create(data: Omit<Tour, 'id' | 'slug' | 'rating' | 'reviewCount'>): Promise<Tour> {
    await delay(600); const tours = getStored();
    const newTour: Tour = { ...data, id: `t${Date.now()}`, slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), rating: 0, reviewCount: 0 };
    tours.push(newTour); saveAll(tours); return newTour;
  },
  async update(id: string, updates: Partial<Tour>): Promise<Tour> {
    await delay(500); const tours = getStored(); const idx = tours.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error('Tur negăsit'); Object.assign(tours[idx], updates); saveAll(tours); return tours[idx];
  },
  async delete(id: string): Promise<void> { await delay(400); saveAll(getStored().filter((t) => t.id !== id)); },
  async toggleActive(id: string): Promise<Tour> {
    await delay(300); const tours = getStored(); const idx = tours.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error('Tur negăsit'); tours[idx].isActive = !tours[idx].isActive; saveAll(tours); return tours[idx];
  },
};
