'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';

export default function InterviewCalendarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Interview Calendar"
        description="View and manage your interview schedule"
      />

      <div className="px-8 py-8">
        <Card className="p-8 text-center">
          <p className="text-gray-600 mb-4">Calendar view coming soon</p>
          <p className="text-sm text-gray-500">Advanced calendar scheduling is under development</p>
        </Card>
      </div>
    </div>
  );
}
