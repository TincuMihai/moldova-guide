import type { Notification } from '../types';

const KEY = 'moldovaguide_notifications';
function getStored(): Notification[] { try { const s = localStorage.getItem(KEY); return s ? JSON.parse(s) : []; } catch { return []; } }
function saveAll(n: Notification[]) { localStorage.setItem(KEY, JSON.stringify(n)); }

export const notificationService = {
  async getAll(): Promise<Notification[]> { return getStored(); },
  async getUnread(): Promise<Notification[]> { return getStored().filter((n) => !n.read); },
  async markRead(id: string): Promise<void> { const n = getStored(); const i = n.findIndex((x) => x.id === id); if (i !== -1) { n[i].read = true; saveAll(n); } },
  async markAllRead(): Promise<void> { const n = getStored(); n.forEach((x) => x.read = true); saveAll(n); },
  async delete(id: string): Promise<void> { saveAll(getStored().filter((n) => n.id !== id)); },
};
