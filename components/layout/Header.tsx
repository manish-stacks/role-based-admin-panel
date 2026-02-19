'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { RoleBadge } from '@/components/admin/RoleBadge';
import { User } from 'lucide-react';

interface HeaderProps {
  title?: string;
  description?: string;
}

export function Header({ title, description }: HeaderProps) {
  const { currentUser } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            {title && <h1 className="text-3xl font-bold text-gray-900">{title}</h1>}
            {description && <p className="text-gray-600 mt-2">{description}</p>}
          </div>
          {currentUser && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {currentUser.avatar && (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">{currentUser.email}</p>
                </div>
              </div>
              <RoleBadge role={currentUser.role} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
