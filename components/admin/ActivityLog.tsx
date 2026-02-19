'use client';

import { ActivityLog as ActivityLogType } from '@/lib/db/types';
import { Card } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityLogProps {
  logs: ActivityLogType[];
  limit?: number;
}

export function ActivityLog({ logs, limit = 10 }: ActivityLogProps) {
  const displayLogs = logs.slice(0, limit);

  if (displayLogs.length === 0) {
    return (
      <Card className="p-6 border border-gray-200">
        <div className="flex flex-col items-center justify-center py-8">
          <Activity className="w-10 h-10 text-gray-300 mb-2" />
          <p className="text-gray-500">No activity logs yet</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border border-gray-200">
      <div className="divide-y divide-gray-200">
        {displayLogs.map((log) => (
          <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {log.user_name}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {log.description}
                </p>
                <div className="flex gap-2 mt-2">
                  <span className="inline-block px-2 py-1 rounded bg-gray-100 text-xs text-gray-700">
                    {log.entity_type}
                  </span>
                  <span className="inline-block px-2 py-1 rounded bg-blue-100 text-xs text-blue-700">
                    {log.action}
                  </span>
                </div>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
