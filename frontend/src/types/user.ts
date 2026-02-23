export type UserRole = 'tourist' | 'guide' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: UserRole;
  phone?: string;
  bio?: string;
  languages?: string[];
  joinedDate: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
