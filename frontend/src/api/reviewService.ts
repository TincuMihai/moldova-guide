import api from './axios';
import { REVIEWS } from './endpoints';
import type { Review } from '../types';

function mapReview(raw: any): Review {
  return { id: String(raw.id), author: raw.author || '', avatar: raw.avatar || '', rating: Number(raw.rating), comment: raw.comment, date: raw.date, tourId: raw.tourId ? String(raw.tourId) : undefined, attractionId: raw.attractionId ? String(raw.attractionId) : undefined };
}

export const reviewService = {
  async getAll(): Promise<Review[]> { return []; },
  async getByAttraction(attractionId: string): Promise<Review[]> { const { data } = await api.get(REVIEWS.GET_BY_ATTRACTION(Number(attractionId))); return (data as any[]).map(mapReview); },
  async getByTour(tourId: string): Promise<Review[]> { const { data } = await api.get(REVIEWS.GET_BY_TOUR(Number(tourId))); return (data as any[]).map(mapReview); },
  async create(data: Omit<Review, 'id'>): Promise<Review> {
    const session = JSON.parse(localStorage.getItem('moldovaguide_session') || '{}');
    const { data: resp } = await api.post(REVIEWS.CREATE(Number(session.id) || 0), { tourId: data.tourId ? Number(data.tourId) : null, attractionId: data.attractionId ? Number(data.attractionId) : null, rating: data.rating, comment: data.comment });
    return resp;
  },
  async delete(id: string): Promise<void> { await api.delete(REVIEWS.DELETE(Number(id))); },
};
