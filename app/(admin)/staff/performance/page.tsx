'use client';

import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/admin/StatCard';
import { TrendingUp, Award, Target, Zap } from 'lucide-react';

export default function PerformancePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="My Performance"
        description="Track your recruitment metrics and achievements"
      />

      <div className="px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Placements"
            value="12"
            icon={TrendingUp}
            change="↑ 3 this month"
            changeType="positive"
          />
          <StatCard
            title="Avg Rating"
            value="4.8/5"
            icon={Award}
            changeType="positive"
          />
          <StatCard
            title="Target Progress"
            value="85%"
            icon={Target}
            change="14 more needed"
          />
          <StatCard
            title="Active Suggestions"
            value="5"
            icon={Zap}
          />
        </div>
      </div>
    </div>
  );
}
