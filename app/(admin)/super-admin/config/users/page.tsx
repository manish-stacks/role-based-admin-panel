'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { mockUsers } from '@/lib/auth/mockUsers';
import { RoleBadge } from '@/components/admin/RoleBadge';
import { Button } from '@/components/ui/button';

export default function UsersConfigPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="User Management"
        description="Configure system users and permissions"
      />

      <div className="px-8 py-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">System Users</h2>

        <div className="grid gap-4">
          {mockUsers.map((user) => (
            <Card key={user.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {user.avatar && (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  {user.company_name && (
                    <p className="text-sm text-gray-600">{user.company_name}</p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <RoleBadge role={user.role} />
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
