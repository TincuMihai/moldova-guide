import api from './axios';
import { CATEGORIES } from './endpoints';
import type { Category } from '../types';

function mapCategory(raw: any): Category { return { id: raw.slug, name: raw.name, icon: '', count: raw.count, color: raw.color || 'bg-slate-50 text-slate-600' }; }

export const categoryService = {
  async getAll(): Promise<Category[]> { const { data } = await api.get(CATEGORIES.GET_ALL); return (data as any[]).map(mapCategory); },
  async getById(id: string): Promise<Category | undefined> { const all = await this.getAll(); return all.find((c) => c.id === id); },
};
