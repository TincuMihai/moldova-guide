import type { SavedPlace } from '../types';
import { mockSavedPlaces } from '../data';

const KEY = 'moldovaguide_saved';
function getStored(): SavedPlace[] { const s = localStorage.getItem(KEY); if (s) return JSON.parse(s); localStorage.setItem(KEY, JSON.stringify(mockSavedPlaces)); return [...mockSavedPlaces]; }
function saveAll(p: SavedPlace[]) { localStorage.setItem(KEY, JSON.stringify(p)); }
const delay = (ms = 300) => new Promise<void>((r) => setTimeout(r, ms));

export const savedPlacesService = {
  async getAll(): Promise<SavedPlace[]> { await delay(); return getStored(); },
  async add(place: Omit<SavedPlace, 'id' | 'savedAt'>): Promise<SavedPlace> {
    await delay(400); const places = getStored();
    const np: SavedPlace = { ...place, id: `sp${Date.now()}`, savedAt: new Date().toISOString().split('T')[0] };
    places.push(np); saveAll(places); return np;
  },
  async updateNotes(id: string, notes: string): Promise<SavedPlace> {
    await delay(300); const places = getStored(); const idx = places.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error('Loc negăsit'); places[idx].notes = notes; saveAll(places); return places[idx];
  },
  async remove(id: string): Promise<void> { await delay(300); saveAll(getStored().filter((p) => p.id !== id)); },
  async isSaved(attractionId: string): Promise<boolean> { await delay(100); return getStored().some((p) => p.attractionId === attractionId); },
};
