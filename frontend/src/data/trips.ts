import type { Trip, SavedPlace } from '../types';

export const mockTrips: Trip[] = [
  { id: 'trip1', title: 'Weekend la Chișinău', userId: 'u1', startDate: '2026-03-14', endDate: '2026-03-16', isPublic: true, createdAt: '2026-02-01', days: [
    { date: '2026-03-14', items: [
      { id: 'ti1', attractionId: 'a1', name: 'Catedrala Nașterea Domnului', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=300&fit=crop', time: '09:00', duration: '1h', notes: 'Vizită dimineața' },
      { id: 'ti2', attractionId: 'a4', name: 'Muzeul Național de Istorie', image: 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=400&h=300&fit=crop', time: '11:00', duration: '2h' },
      { id: 'ti3', attractionId: 'a6', name: 'Piața Centrală', image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=300&fit=crop', time: '14:00', duration: '1.5h', notes: 'Prânz + cumpărături' },
    ]},
    { date: '2026-03-15', items: [
      { id: 'ti4', attractionId: 'a3', name: 'Parcul Dendrarium', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop', time: '10:00', duration: '2h' },
      { id: 'ti5', attractionId: 'a7', name: 'Teatrul Național', image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=300&fit=crop', time: '18:00', duration: '3h' },
    ]},
  ]},
];

export const mockSavedPlaces: SavedPlace[] = [
  { id: 'sp1', attractionId: 'a2', name: 'Cramele Mileștii Mici', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop', category: 'winery', city: 'Mileștii Mici', rating: 4.9, notes: 'Trebuie vizitat cu prietenii!', savedAt: '2026-01-15' },
  { id: 'sp2', attractionId: 'a5', name: 'Orheiul Vechi', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', category: 'nature', city: 'Orhei', rating: 4.8, notes: '', savedAt: '2026-01-20' },
  { id: 'sp3', attractionId: 'a1', name: 'Catedrala Nașterea Domnului', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=300&fit=crop', category: 'church', city: 'Chișinău', rating: 4.7, notes: 'Fotografii frumoase dimineața', savedAt: '2026-02-01' },
  { id: 'sp4', attractionId: 'a7', name: 'Teatrul Național', image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=300&fit=crop', category: 'theatre', city: 'Chișinău', rating: 4.6, notes: '', savedAt: '2026-02-05' },
];
