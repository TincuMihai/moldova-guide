import api from './axios';
import { BOOKINGS } from './endpoints';
import type { Booking, BookingStatus } from '../types';

function mapBooking(raw: any): Booking {
  return {
    id: String(raw.id), tourId: String(raw.tourId), tourTitle: raw.tourTitle || '',
    tourImage: raw.tourImage || '', userId: String(raw.userId), guideName: raw.guideName || '',
    date: raw.date, participants: raw.participants, totalPrice: Number(raw.totalPrice),
    currency: raw.currency, status: raw.status as BookingStatus,
    createdAt: raw.createdAt, meetingPoint: raw.meetingPoint || '',
  };
}

export const bookingService = {
  async getAll(): Promise<Booking[]> { const { data } = await api.get(BOOKINGS.GET_ALL); return (data as any[]).map(mapBooking); },
  async getByUser(userId: string): Promise<Booking[]> { const { data } = await api.get(BOOKINGS.GET_BY_USER(Number(userId))); return (data as any[]).map(mapBooking); },
  async getByGuide(guideName: string): Promise<Booking[]> { const all = await this.getAll(); return all.filter((b) => b.guideName === guideName); },
  async getById(id: string): Promise<Booking | undefined> { const all = await this.getAll(); return all.find((b) => b.id === id); },
  async create(data: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> {
    const { data: resp } = await api.post(BOOKINGS.CREATE(Number(data.userId)), { tourId: Number(data.tourId), date: data.date, participants: data.participants });
    return resp;
  },
  async updateStatus(id: string, status: BookingStatus): Promise<Booking> { const { data } = await api.put(BOOKINGS.UPDATE_STATUS(Number(id), status)); return data; },
  async delete(id: string): Promise<void> { await api.delete(BOOKINGS.DELETE(Number(id))); },
};
