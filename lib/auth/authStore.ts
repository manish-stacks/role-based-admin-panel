'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, LoginCredentials } from './types';
import { mockUsers } from './mockUsers';
import { hasPermission, canAccessRoute, Permission } from './permissions';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Find user by email (mock auth)
          const user = mockUsers.find(u => u.email === credentials.email && u.password === credentials.password);
         
          if (!user) {
            throw new Error('User not found');
          }
          
          set({
            currentUser: user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          currentUser: null,
          isAuthenticated: false,
          error: null,
        });
      },

      hasPermission: (permission: Permission) => {  
        const { currentUser } = get();
        if (!currentUser) return false;
        return hasPermission(currentUser.role, permission);
      },

      canAccess: (route: string) => {
        const { currentUser } = get();
        if (!currentUser) return false;
        return canAccessRoute(currentUser.role, route);
      },
    }),
    {
      name: 'auth-store',
      version: 1,
    }
  )
);
