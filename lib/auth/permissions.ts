import { UserRole } from './types';

export type Permission = 
  | 'view_dashboard'
  | 'manage_companies'
  | 'manage_jobs'
  | 'manage_candidates'
  | 'manage_staff'
  | 'manage_interviews'
  | 'manage_offers'
  | 'manage_suggestions'
  | 'view_audit_logs'
  | 'create_suggestion'
  | 'view_performance'
  | 'manage_users'
  | 'manage_roles';

export const rolePermissions: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [
    'view_dashboard',
    'manage_companies',
    'manage_jobs',
    'manage_candidates',
    'manage_staff',
    'manage_interviews',
    'manage_offers',
    'manage_suggestions',
    'view_audit_logs',
    'manage_users',
    'manage_roles',
  ],
  STAFF: [
    'view_dashboard',
    'manage_jobs',
    'manage_candidates',
    'manage_interviews',
    'manage_offers',
    'manage_suggestions',
    'create_suggestion',
    'view_performance',
  ],
  CUSTOMER: [
    'view_dashboard',
    'manage_jobs',
    'manage_interviews',
    'manage_offers',
  ],
};

export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  return rolePermissions[role]?.includes(permission) ?? false;
};

// Route access configuration
export const routeAccess: Record<string, UserRole[]> = {
  '/super-admin': ['SUPER_ADMIN'],
  '/staff': ['STAFF'],
  '/customer': ['CUSTOMER'],
};

export const canAccessRoute = (role: UserRole, route: string): boolean => {
  const baseRoute = route.split('/').slice(0, 3).join('/');
  const allowedRoles = routeAccess[baseRoute];
  return allowedRoles?.includes(role) ?? true;
};
