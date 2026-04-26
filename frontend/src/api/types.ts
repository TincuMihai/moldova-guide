export interface ActionResponse {
  isSuccess: boolean;
  message: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    phone: string | null;
    bio: string | null;
    languages: string | null;
    role: string;
    registeredOn: string;
  };
}
