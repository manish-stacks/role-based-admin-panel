'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

export default function Page() {
  const router = useRouter();
  const { isAuthenticated, currentUser } = useAuth();

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      // Redirect to role-specific dashboard
      if (currentUser.role === 'SUPER_ADMIN') {
        router.push('/super-admin/dashboard');
      } else if (currentUser.role === 'STAFF') {
        router.push('/staff/dashboard');
      } else if (currentUser.role === 'CUSTOMER') {
        router.push('/customer/dashboard');
      }
    } else {
      // Redirect to login if not authenticated
      router.push('/login');
    }
  }, [isAuthenticated, currentUser, router]);

  return null;
}
