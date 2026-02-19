'use client';

import { UserRole } from '@/lib/auth/types';
import { roleColors, roleNames } from '@/lib/routes/roleRoutes';
import { Badge } from '@/components/ui/badge';

interface RoleBadgeProps {
  role: UserRole;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const bgColor = roleColors[role];
  const displayName = roleNames[role];
  
  return (
    <Badge className={`${bgColor} text-white`}>
      {displayName}
    </Badge>
  );
}
