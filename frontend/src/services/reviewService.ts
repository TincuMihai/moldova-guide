import type { Review } from '../types';
import { reviews as initialData } from '../data';

const KEY = 'moldovaguide_reviews';
function getStored(): Review[] { const s = localStorage.getItem(KEY); if (s) return JSON.parse(s); localStorage.setItem(KEY, JSON.stringify(initialData)); return [...initialData]; }
function saveAll(r: Review[]) { localStorage.setItem(KEY, JSON.stringify(r)); }
const delay = (ms = 300) => new Promise<void>((r) => setTimeout(r, ms));

export const reviewService = {
  async getAll(): Promise<Review[]> { await delay(); return getStored(); },
  async getByAttraction(attractionId: string): Promise<Review[]> {
    await delay();
    const all = getStored();
    const filtered = all.filter((r) => r.attractionId === attractionId);
    return filtered.length > 0 ? filtered : all.slice(0, 3);
  },
  async getByTour(tourId: string): Promise<Review[]> {
    await delay();
    const all = getStored();
    const filtered = all.filter((r) => r.tourId === tourId);
    return filtered.length > 0 ? filtered : all.slice(0, 3);
  },
  async create(data: Omit<Review, 'id'>): Promise<Review> {
    await delay(500); const reviews = getStored();
    const nr: Review = { ...data, id: `rev${Date.now()}` };
    reviews.unshift(nr); saveAll(reviews); return nr;
  },
  async delete(id: string): Promise<void> { await delay(300); saveAll(getStored().filter((r) => r.id !== id)); },
};
