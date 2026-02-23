export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  tourId?: string;
  attractionId?: string;
}
