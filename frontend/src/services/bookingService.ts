import type { Booking, BookingStatus } from '../types';
import { mockBookings } from '../data';

const KEY = 'moldovaguide_bookings';
function getStored(): Booking[] { const s = localStorage.getItem(KEY); if (s) return JSON.parse(s); localStorage.setItem(KEY, JSON.stringify(mockBookings)); return [...mockBookings]; }
function saveAll(b: Booking[]) { localStorage.setItem(KEY, JSON.stringify(b)); }
const delay = (ms = 400) => new Promise<void>((r) => setTimeout(r, ms));

export const bookingService = {
  async getByUser(userId: string): Promise<Booking[]> { await delay(); return getStored().filter((b) => b.userId === userId); },
  async getByGuide(guideName: string): Promise<Booking[]> { await delay(); return getStored().filter((b) => b.guideName === guideName); },
  async getById(id: string): Promise<Booking | undefined> { await delay(200); return getStored().find((b) => b.id === id); },
  async create(data: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> {
    await delay(600); const bookings = getStored();
    const nb: Booking = { ...data, id: `b${Date.now()}`, createdAt: new Date().toISOString().split('T')[0] };
    bookings.push(nb); saveAll(bookings); return nb;
  },
  async updateStatus(id: string, status: BookingStatus): Promise<Booking> {
    await delay(400); const bookings = getStored(); const idx = bookings.findIndex((b) => b.id === id);
    if (idx === -1) throw new Error('Rezervare negăsită'); bookings[idx].status = status; saveAll(bookings); return bookings[idx];
  },
  async delete(id: string): Promise<void> { await delay(300); saveAll(getStored().filter((b) => b.id !== id)); },
};
