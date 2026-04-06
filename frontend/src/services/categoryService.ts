import type { Category } from '../types';
import { categories as initialData } from '../data';

const delay = (ms = 200) => new Promise<void>((r) => setTimeout(r, ms));

export const categoryService = {
  async getAll(): Promise<Category[]> { await delay(); return [...initialData]; },
  async getById(id: string): Promise<Category | undefined> { await delay(100); return initialData.find((c) => c.id === id); },
};
