'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { roleMenus } from '@/lib/routes/roleRoutes';
import { RoleBadge } from '@/components/admin/RoleBadge';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { currentUser, logout } = useAuth();
  const pathname = usePathname();

  if (!currentUser) return null;

  const menuItems = roleMenus[currentUser.role];

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen overflow-y-auto flex flex-col">
      {/* Logo / Brand */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">HRMS</h1>
        <p className="text-xs text-gray-400 mt-2">Recruitment Admin</p>
      </div>

      {/* User Info */}
      <div className="p-4 bg-gray-800 m-4 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          {currentUser.avatar && (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{currentUser.name}</p>
            <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
          </div>
        </div>
        <RoleBadge role={currentUser.role} />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium',
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
