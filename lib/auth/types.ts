export type UserRole = 'SUPER_ADMIN' | 'STAFF' | 'CUSTOMER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company_id?: string;
  company_name?: string;
  avatar?: string;
  created_at: string;
  password?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string; // Mock auth, optional
}

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  canAccess: (route: string) => boolean;
}
