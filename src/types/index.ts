export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
