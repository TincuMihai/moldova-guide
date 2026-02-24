import type { User } from '../types';

export const mockUsers: (User & { password: string })[] = [
  { id: 'u1', email: 'tourist@demo.md', password: 'tourist123', name: 'Elena Vasile', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', role: 'tourist', phone: '+373 69 123 456', bio: 'Pasionată de călătorii și descoperirea locurilor noi din Moldova.', languages: ['Română', 'English'], joinedDate: '2025-06-15' },
  { id: 'u2', email: 'guide@demo.md', password: 'guide123', name: 'Alexandru Moraru', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', role: 'guide', phone: '+373 79 987 654', bio: 'Ghid certificat cu 8 ani experiență.', languages: ['Română', 'English', 'Русский'], joinedDate: '2019-03-15' },
  { id: 'u3', email: 'admin@demo.md', password: 'admin123', name: 'Admin MoldovaGuide', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', role: 'admin', joinedDate: '2024-01-01' },
];
