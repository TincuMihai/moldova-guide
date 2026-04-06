import type { Notification } from '../types';
import { mockNotifications as initialData } from '../data';

const KEY = 'moldovaguide_notifications';
function getStored(): Notification[] { const s = localStorage.getItem(KEY); if (s) return JSON.parse(s); localStorage.setItem(KEY, JSON.stringify(initialData)); return [...initialData]; }
function saveAll(n: Notification[]) { localStorage.setItem(KEY, JSON.stringify(n)); }
const delay = (ms = 200) => new Promise<void>((r) => setTimeout(r, ms));

export const notificationService = {
  async getAll(): Promise<Notification[]> { await delay(); return getStored(); },
  async getUnread(): Promise<Notification[]> { await delay(); return getStored().filter((n) => !n.read); },
  async markRead(id: string): Promise<void> {
    await delay(100); const notifs = getStored();
    const idx = notifs.findIndex((n) => n.id === id);
    if (idx !== -1) { notifs[idx].read = true; saveAll(notifs); }
  },
  async markAllRead(): Promise<void> { await delay(200); const notifs = getStored(); notifs.forEach((n) => n.read = true); saveAll(notifs); },
  async delete(id: string): Promise<void> { await delay(100); saveAll(getStored().filter((n) => n.id !== id)); },
};
