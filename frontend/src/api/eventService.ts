import api from './axios';
import { EVENTS } from './endpoints';
import type { Event } from '../types/event';

function mapEvent(raw: any): Event { return { id: String(raw.id), title: raw.title, description: raw.description, category: raw.category, date: raw.date, time: raw.time, venue: raw.venue, image: raw.image || '', price: raw.price }; }

export const eventService = {
  async getAll(): Promise<Event[]> { const { data } = await api.get(EVENTS.GET_ALL); return (data as any[]).map(mapEvent); },
  async getUpcoming(limit = 3): Promise<Event[]> { const all = await this.getAll(); return all.slice(0, limit); },
  async getById(id: string): Promise<Event | undefined> { try { const { data } = await api.get(EVENTS.GET_BY_ID(Number(id))); return mapEvent(data); } catch { return undefined; } },
};
