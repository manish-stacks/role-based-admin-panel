'use client';

import { Header } from '@/components/layout/Header';
import { ActivityLog } from '@/components/admin/ActivityLog';
import mockDb from '@/lib/db/mockDb';

export default function AuditLogsPage() {
  const allLogs = mockDb.activityLogs;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Audit Logs"
        description="Track all system activities and changes"
      />

      <div className="px-8 py-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Activity Logs ({allLogs.length})
        </h2>

        <ActivityLog logs={allLogs} limit={50} />
      </div>
    </div>
  );
}
