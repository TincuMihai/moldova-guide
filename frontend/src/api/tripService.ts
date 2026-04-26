import type { Trip } from '../types';

const KEY = 'moldovaguide_trips';
function getStored(): Trip[] { try { const s = localStorage.getItem(KEY); return s ? JSON.parse(s) : []; } catch { return []; } }
function saveAll(t: Trip[]) { localStorage.setItem(KEY, JSON.stringify(t)); }

export const tripService = {
  async getByUser(userId: string): Promise<Trip[]> { return getStored().filter((t) => t.userId === userId); },
  async getById(id: string): Promise<Trip | undefined> { return getStored().find((t) => t.id === id); },
  async create(data: Omit<Trip, 'id' | 'createdAt'>): Promise<Trip> {
    const trips = getStored();
    const nt: Trip = { ...data, id: `trip${Date.now()}`, createdAt: new Date().toISOString().split('T')[0] };
    trips.push(nt); saveAll(trips); return nt;
  },
  async update(id: string, updates: Partial<Trip>): Promise<Trip> {
    const trips = getStored(); const idx = trips.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error('Călătorie negăsită'); Object.assign(trips[idx], updates); saveAll(trips); return trips[idx];
  },
  async delete(id: string): Promise<void> { saveAll(getStored().filter((t) => t.id !== id)); },
};
