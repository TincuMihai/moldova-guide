import type { Trip } from '../types';
import { mockTrips } from '../data';

const KEY = 'moldovaguide_trips';
function getStored(): Trip[] { const s = localStorage.getItem(KEY); if (s) return JSON.parse(s); localStorage.setItem(KEY, JSON.stringify(mockTrips)); return [...mockTrips]; }
function saveAll(t: Trip[]) { localStorage.setItem(KEY, JSON.stringify(t)); }
const delay = (ms = 400) => new Promise<void>((r) => setTimeout(r, ms));

export const tripService = {
  async getByUser(userId: string): Promise<Trip[]> { await delay(); return getStored().filter((t) => t.userId === userId); },
  async getById(id: string): Promise<Trip | undefined> { await delay(200); return getStored().find((t) => t.id === id); },
  async create(data: Omit<Trip, 'id' | 'createdAt'>): Promise<Trip> {
    await delay(600); const trips = getStored();
    const nt: Trip = { ...data, id: `trip${Date.now()}`, createdAt: new Date().toISOString().split('T')[0] };
    trips.push(nt); saveAll(trips); return nt;
  },
  async update(id: string, updates: Partial<Trip>): Promise<Trip> {
    await delay(500); const trips = getStored(); const idx = trips.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error('Călătorie negăsită'); Object.assign(trips[idx], updates); saveAll(trips); return trips[idx];
  },
  async delete(id: string): Promise<void> { await delay(300); saveAll(getStored().filter((t) => t.id !== id)); },
};
