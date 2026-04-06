import type { Event } from '../types';
import { events as initialData } from '../data';

const delay = (ms = 300) => new Promise<void>((r) => setTimeout(r, ms));

export const eventService = {
  async getAll(): Promise<Event[]> { await delay(); return [...initialData]; },
  async getUpcoming(limit = 3): Promise<Event[]> { await delay(); return initialData.slice(0, limit); },
  async getById(id: string): Promise<Event | undefined> { await delay(200); return initialData.find((e) => e.id === id); },
};
