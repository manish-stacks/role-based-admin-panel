import { UserRole } from '@/lib/auth/types';
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  FileText, 
  Calendar, 
  CheckCircle,
  Settings,
  LogOut,
  LucideIcon,
  TrendingUp,
  Clock,
  Award,
} from 'lucide-react';

export interface MenuItemConfig {
  label: string;
  href: string;
  icon: LucideIcon;
  requiredPermission?: string;
}

export interface RoleMenuConfig {
  role: UserRole;
  baseRoute: string;
  items: MenuItemConfig[];
}

export const roleMenus: Record<UserRole, MenuItemConfig[]> = {
  SUPER_ADMIN: [
    {
      label: 'Dashboard',
      href: '/super-admin/dashboard',
      icon: BarChart3,
    },
    {
      label: 'Companies',
      href: '/super-admin/companies',
      icon: Users,
    },
    {
      label: 'Jobs',
      href: '/super-admin/jobs',
      icon: Briefcase,
    },
    {
      label: 'Candidates',
      href: '/super-admin/candidates',
      icon: Users,
    },
    {
      label: 'Interviews',
      href: '/super-admin/interviews',
      icon: Calendar,
    },
    {
      label: 'Interview Queue',
      href: '/super-admin/interviews/sla-queue',
      icon: Clock,
    },
    {
      label: 'Offers',
      href: '/super-admin/offers',
      icon: CheckCircle,
    },
    {
      label: 'Staff',
      href: '/super-admin/staff',
      icon: Users,
    },
    {
      label: 'Reports',
      href: '/super-admin/reports',
      icon: BarChart3,
    },
    {
      label: 'Audit Logs',
      href: '/super-admin/audit-logs',
      icon: FileText,
    },
    {
      label: 'Configuration',
      href: '/super-admin/config/users',
      icon: Settings,
    },
  ],
  STAFF: [
    {
      label: 'Dashboard',
      href: '/staff/dashboard',
      icon: BarChart3,
    },
    {
      label: 'My Jobs',
      href: '/staff/jobs',
      icon: Briefcase,
    },
    {
      label: 'Candidates',
      href: '/staff/candidates',
      icon: Users,
    },
    {
      label: 'My Suggestions',
      href: '/staff/suggestions',
      icon: FileText,
    },
    {
      label: 'Create Suggestion',
      href: '/staff/suggestions/create',
      icon: CheckCircle,
    },
    {
      label: 'Interviews',
      href: '/staff/interviews',
      icon: Calendar,
    },
    {
      label: 'Interview Calendar',
      href: '/staff/interviews/calendar',
      icon: Calendar,
    },
    {
      label: 'Offers',
      href: '/staff/offers',
      icon: Award,
    },
    {
      label: 'Performance',
      href: '/staff/performance',
      icon: TrendingUp,
    },
  ],
  CUSTOMER: [
    {
      label: 'Dashboard',
      href: '/customer/dashboard',
      icon: BarChart3,
    },
    {
      label: 'Jobs',
      href: '/customer/jobs',
      icon: Briefcase,
    },
    {
      label: 'Suggested Candidates',
      href: '/customer/suggested-candidates',
      icon: Users,
    },
    {
      label: 'Interviews',
      href: '/customer/interviews',
      icon: Calendar,
    },
    {
      label: 'Interview Calendar',
      href: '/customer/interviews/calendar',
      icon: Calendar,
    },
    {
      label: 'Offers',
      href: '/customer/offers',
      icon: Award,
    },
  ],
};

export const roleColors: Record<UserRole, string> = {
  SUPER_ADMIN: 'bg-red-600',
  STAFF: 'bg-blue-600',
  CUSTOMER: 'bg-green-600',
};

export const roleNames: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super Admin',
  STAFF: 'Recruiter',
  CUSTOMER: 'Company HR',
};
