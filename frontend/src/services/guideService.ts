import type { Guide } from '../types';
import { guides as initialData } from '../data';

const delay = (ms = 300) => new Promise<void>((r) => setTimeout(r, ms));

export const guideService = {
  async getAll(): Promise<Guide[]> { await delay(); return [...initialData]; },
  async getById(id: string): Promise<Guide | undefined> { await delay(200); return initialData.find((g) => g.id === id); },
  async getByName(name: string): Promise<Guide | undefined> { await delay(200); return initialData.find((g) => g.name === name); },
};
