export interface TripItem {
  id: string;
  attractionId: string;
  name: string;
  image: string;
  time: string;
  duration: string;
  notes?: string;
}

export interface TripDay {
  date: string;
  items: TripItem[];
}

export interface Trip {
  id: string;
  title: string;
  userId: string;
  startDate: string;
  endDate: string;
  days: TripDay[];
  isPublic: boolean;
  createdAt: string;
}

export interface SavedPlace {
  id: string;
  attractionId: string;
  name: string;
  image: string;
  category: string;
  city: string;
  rating: number;
  notes: string;
  savedAt: string;
}
