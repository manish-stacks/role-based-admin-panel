'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { StatCard } from '@/components/admin/StatCard';
import { BarChart3, TrendingUp } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Reports & Analytics"
        description="View system-wide recruitment metrics"
      />

      <div className="px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Placement Rate"
            value="72%"
            icon={BarChart3}
            changeType="positive"
            change="↑ 8% from last month"
          />
          <StatCard
            title="Avg Time to Hire"
            value="18 days"
            icon={TrendingUp}
          />
          <StatCard
            title="Total Placements"
            value="147"
            icon={BarChart3}
          />
          <StatCard
            title="Pipeline Value"
            value="$2.4M"
            icon={BarChart3}
            changeType="positive"
            change="↑ 15% growth"
          />
        </div>

        <Card className="p-8 text-center">
          <p className="text-gray-600 mb-4">Detailed analytics and charts coming soon</p>
          <p className="text-sm text-gray-500">Advanced reporting features are under development</p>
        </Card>
      </div>
    </div>
  );
}
