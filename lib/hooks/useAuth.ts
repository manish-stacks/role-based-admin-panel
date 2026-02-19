'use client';

import { useAuthStore } from '@/lib/auth/authStore';
import { Permission } from '@/lib/auth/permissions';

export function useAuth() {
  const {
    currentUser,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    hasPermission,
    canAccess,
  } = useAuthStore();

  return {
    currentUser,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    hasPermission: (permission: Permission) => hasPermission(permission),
    canAccess: (route: string) => canAccess(route),
  };
}
