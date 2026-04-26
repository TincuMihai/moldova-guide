import api from './axios';
import { AUTH, USERS } from './endpoints';
import type { LoginResponse, ActionResponse } from './types';
import type { User, LoginCredentials, RegisterData } from '../types';

const SESSION_KEY = 'moldovaguide_session';
const TOKEN_KEY = 'moldovaguide_token';

function mapUser(raw: LoginResponse['user']): User {
  return {
    id: String(raw.id),
    name: raw.name,
    email: raw.email,
    avatar: raw.avatar || '',
    role: raw.role as User['role'],
    phone: raw.phone || undefined,
    bio: raw.bio || undefined,
    languages: raw.languages?.split(',').map((l) => l.trim()) || undefined,
    joinedDate: raw.registeredOn,
  };
}

export const authService = {
  async login(creds: LoginCredentials): Promise<User> {
    const { data } = await api.post<LoginResponse>(AUTH.LOGIN, {
      email: creds.email,
      password: creds.password,
    });
    const user = mapUser(data.user);
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, data.token);
    return user;
  },

  async register(reg: RegisterData): Promise<User> {
    await api.post<ActionResponse>(AUTH.REGISTER, {
      name: reg.name,
      email: reg.email,
      password: reg.password,
      role: reg.role,
    });
    return this.login({ email: reg.email, password: reg.password });
  },

  async logout(): Promise<void> {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },

  getSession(): User | null {
    try {
      const s = localStorage.getItem(SESSION_KEY);
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  },

  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    await api.put(USERS.UPDATE_PROFILE(Number(userId)), {
      name: updates.name,
      phone: updates.phone,
      bio: updates.bio,
      languages: updates.languages?.join(', '),
      avatar: updates.avatar,
    });
    const { data } = await api.get(USERS.GET_BY_ID(Number(userId)));
    const user = mapUser(data);
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  },
};
