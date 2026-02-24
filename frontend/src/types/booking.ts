export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Booking {
  id: string;
  tourId: string;
  tourTitle: string;
  tourImage: string;
  userId: string;
  guideName: string;
  date: string;
  participants: number;
  totalPrice: number;
  currency: string;
  status: BookingStatus;
  createdAt: string;
  meetingPoint: string;
}
