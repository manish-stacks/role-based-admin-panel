'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { rolePermissions, roleNames } from '@/lib/auth/permissions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function RolesConfigPage() {
  const roles = Object.entries(rolePermissions);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Role Management"
        description="Configure user roles and permissions"
      />

      <div className="px-8 py-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Roles & Permissions</h2>

        <div className="grid gap-4">
          {roles.map(([role, permissions]) => (
            <Card key={role} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {roleNames[role as keyof typeof roleNames]}
                  </h3>
                  <p className="text-sm text-gray-600">{permissions.length} permissions</p>
                </div>
                <Button variant="outline" size="sm">
                  Edit Permissions
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {permissions.map((permission) => (
                  <Badge key={permission} variant="secondary" className="text-xs">
                    {permission.replace(/_/g, ' ')}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
