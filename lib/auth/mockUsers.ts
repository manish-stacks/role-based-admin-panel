import { User } from './types';

export const mockUsers: User[] = [
  {
    id: 'super-admin-1',
    email: 'admin@hrms.com',
    password: '123456',
    name: 'Sarah Johnson',
    role: 'SUPER_ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    created_at: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'staff-1',
    email: 'recruiter@hrms.com',
    password: '123456',
    name: 'Michael Chen',
    role: 'STAFF',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'customer-1',
    email: 'hr@techcorp.com',
    password: '123456',
    name: 'Emily Watson',
    role: 'CUSTOMER',
    company_id: 'company-1',
    company_name: 'TechCorp Inc',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
