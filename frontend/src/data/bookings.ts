import type { Booking } from '../types';

export const mockBookings: Booking[] = [
  { id: 'b1', tourId: 't1', tourTitle: 'Chișinău: Istoria Ascunsă', tourImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop', userId: 'u1', guideName: 'Alexandru Moraru', date: '2026-02-22', participants: 2, totalPrice: 70, currency: 'EUR', status: 'confirmed', createdAt: '2026-02-05', meetingPoint: 'Arcul de Triumf' },
  { id: 'b2', tourId: 't2', tourTitle: 'Ruta Vinurilor: Cricova & Mileștii Mici', tourImage: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop', userId: 'u1', guideName: 'Maria Postolachi', date: '2026-03-07', participants: 1, totalPrice: 75, currency: 'EUR', status: 'pending', createdAt: '2026-02-10', meetingPoint: 'Hotel Nobil' },
  { id: 'b3', tourId: 't3', tourTitle: 'Street Art & Urban Culture', tourImage: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=400&h=300&fit=crop', userId: 'u1', guideName: 'Ion Cebanu', date: '2026-01-20', participants: 3, totalPrice: 75, currency: 'EUR', status: 'completed', createdAt: '2026-01-10', meetingPoint: 'Scara din spatele Circului' },
  { id: 'b4', tourId: 't4', tourTitle: 'Orheiul Vechi: Călătorie Spirituală', tourImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', userId: 'u1', guideName: 'Alexandru Moraru', date: '2026-01-05', participants: 2, totalPrice: 110, currency: 'EUR', status: 'cancelled', createdAt: '2025-12-28', meetingPoint: 'Piața Marii Adunări Naționale' },
];
