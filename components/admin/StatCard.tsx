'use client';

import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

export function StatCard({
  title,
  value,
  icon: Icon,
  change,
  changeType = 'neutral',
}: StatCardProps) {
  const changeColor = 
    changeType === 'positive' ? 'text-green-600' :
    changeType === 'negative' ? 'text-red-600' :
    'text-gray-600';

  return (
    <Card className="p-6 border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
          {change && (
            <p className={`text-xs mt-2 ${changeColor}`}>
              {change}
            </p>
          )}
        </div>
        <div className="p-3 bg-gray-100 rounded-lg">
          <Icon className="w-5 h-5 text-gray-600" />
        </div>
      </div>
    </Card>
  );
}
