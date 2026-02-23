import type { User, LoginCredentials, RegisterData } from '../types';
import { mockUsers } from '../data';

const SESSION_KEY = 'moldovaguide_session';
const USERS_KEY = 'moldovaguide_users';

function getStoredUsers(): typeof mockUsers {
  const stored = localStorage.getItem(USERS_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(USERS_KEY, JSON.stringify(mockUsers));
  return [...mockUsers];
}

const delay = (ms = 500) => new Promise<void>((r) => setTimeout(r, ms));

export const authService = {
  async login(creds: LoginCredentials): Promise<User> {
    await delay(800);
    const users = getStoredUsers();
    const found = users.find((u) => u.email === creds.email && u.password === creds.password);
    if (!found) throw new Error('Email sau parolă incorectă');
    const { password: _, ...user } = found;
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  },
  async register(data: RegisterData): Promise<User> {
    await delay(800);
    const users = getStoredUsers();
    if (users.find((u) => u.email === data.email)) throw new Error('Acest email este deja înregistrat');
    const newUser = {
      id: `u${Date.now()}`, email: data.email, password: data.password, name: data.name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=ec751c&color=fff&size=150`,
      role: data.role, joinedDate: new Date().toISOString().split('T')[0],
    };
    users.push(newUser as typeof mockUsers[0]);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const { password: _, ...user } = newUser;
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user as User;
  },
  async logout() { await delay(300); localStorage.removeItem(SESSION_KEY); },
  getSession(): User | null {
    try { const s = localStorage.getItem(SESSION_KEY); return s ? JSON.parse(s) : null; }
    catch { return null; }
  },
  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    await delay(500);
    const users = getStoredUsers();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) throw new Error('Utilizator negăsit');
    Object.assign(users[idx], updates);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const { password: _, ...user } = users[idx];
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user as User;
  },
};
