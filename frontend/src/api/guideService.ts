import api from './axios';
import { USERS } from './endpoints';
import type { Guide } from '../types';

function mapGuide(raw: any): Guide {
  return { id: String(raw.id), name: raw.name, avatar: raw.avatar || '', bio: raw.bio || '', languages: raw.languages?.split(',').map((l: string) => l.trim()) || [], rating: 0, reviewCount: 0, tourCount: 0, certifications: [], joinedDate: raw.registeredOn || '' };
}

export const guideService = {
  async getAll(): Promise<Guide[]> { const { data } = await api.get(USERS.GET_ALL); return (data as any[]).filter((u: any) => u.role === 'guide').map(mapGuide); },
  async getById(id: string): Promise<Guide | undefined> { try { const { data } = await api.get(USERS.GET_BY_ID(Number(id))); if (data.role !== 'guide') return undefined; return mapGuide(data); } catch { return undefined; } },
  async getByName(name: string): Promise<Guide | undefined> { const all = await this.getAll(); return all.find((g) => g.name === name); },
};
