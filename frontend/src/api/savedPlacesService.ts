import type { SavedPlace } from '../types';

const KEY = 'moldovaguide_saved';
function getStored(): SavedPlace[] { try { const s = localStorage.getItem(KEY); return s ? JSON.parse(s) : []; } catch { return []; } }
function saveAll(p: SavedPlace[]) { localStorage.setItem(KEY, JSON.stringify(p)); }

export const savedPlacesService = {
  async getAll(): Promise<SavedPlace[]> { return getStored(); },
  async add(place: Omit<SavedPlace, 'id' | 'savedAt'>): Promise<SavedPlace> {
    const places = getStored();
    const np: SavedPlace = { ...place, id: `sp${Date.now()}`, savedAt: new Date().toISOString().split('T')[0] };
    places.push(np); saveAll(places); return np;
  },
  async updateNotes(id: string, notes: string): Promise<SavedPlace> {
    const places = getStored(); const idx = places.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error('Loc negăsit'); places[idx].notes = notes; saveAll(places); return places[idx];
  },
  async remove(id: string): Promise<void> { saveAll(getStored().filter((p) => p.id !== id)); },
  async isSaved(attractionId: string): Promise<boolean> { return getStored().some((p) => p.attractionId === attractionId); },
};
