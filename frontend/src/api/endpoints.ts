export const AUTH = {
  LOGIN: '/session/auth',
  REGISTER: '/reg',
} as const;

export const USERS = {
  GET_ALL: '/users/getAll',
  GET_BY_ID: (id: number) => `/users/${id}`,
  UPDATE_PROFILE: (id: number) => `/users/${id}/profile`,
  BLOCK: (id: number) => `/users/${id}/block`,
  DELETE: (id: number) => `/users/${id}`,
} as const;

export const ATTRACTIONS = {
  GET_ALL: '/attractions/getAll',
  GET_FEATURED: '/attractions/featured',
  GET_BY_SLUG: (slug: string) => `/attractions/${slug}`,
  CREATE: '/attractions',
  UPDATE: (id: number) => `/attractions/${id}`,
  DELETE: (id: number) => `/attractions/${id}`,
} as const;

export const TOURS = {
  GET_ALL: '/tours/getAll',
  GET_BY_SLUG: (slug: string) => `/tours/${slug}`,
  GET_BY_GUIDE: (guideId: number) => `/tours/guide/${guideId}`,
  CREATE: (guideId: number) => `/tours/${guideId}`,
  TOGGLE_ACTIVE: (id: number) => `/tours/${id}/toggle`,
  DELETE: (id: number) => `/tours/${id}`,
} as const;

export const BOOKINGS = {
  GET_ALL: '/bookings/getAll',
  GET_BY_USER: (userId: number) => `/bookings/user/${userId}`,
  CREATE: (userId: number) => `/bookings/${userId}`,
  UPDATE_STATUS: (id: number, status: string) => `/bookings/${id}/status?status=${status}`,
  DELETE: (id: number) => `/bookings/${id}`,
} as const;

export const REVIEWS = {
  GET_BY_ATTRACTION: (id: number) => `/reviews/attraction/${id}`,
  GET_BY_TOUR: (id: number) => `/reviews/tour/${id}`,
  CREATE: (userId: number) => `/reviews/${userId}`,
  DELETE: (id: number) => `/reviews/${id}`,
} as const;

export const EVENTS = {
  GET_ALL: '/events/getAll',
  GET_BY_ID: (id: number) => `/events/${id}`,
  CREATE: '/events',
  UPDATE: (id: number) => `/events/${id}`,
  DELETE: (id: number) => `/events/${id}`,
} as const;

export const CATEGORIES = {
  GET_ALL: '/categories/getAll',
  CREATE: '/categories',
  DELETE: (id: number) => `/categories/${id}`,
} as const;

export const HEALTH = {
  CHECK: '/health',
} as const;
