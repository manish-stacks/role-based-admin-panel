'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function StaffPage() {
  const staffMembers = [
    {
      id: 'staff-1',
      name: 'Michael Chen',
      role: 'Senior Recruiter',
      email: 'recruiter@hrms.com',
      activeJobs: 2,
      suggestions: 5,
      interviews: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Staff Management"
        description="Manage recruitment team members"
      />

      <div className="px-8 py-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Team Members ({staffMembers.length})
        </h2>

        <div className="grid gap-4">
          {staffMembers.map((staff) => (
            <Card key={staff.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{staff.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{staff.role}</p>
                  <p className="text-sm text-gray-600 mb-4">{staff.email}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <Badge variant="secondary">{staff.activeJobs} active jobs</Badge>
                    <Badge variant="secondary">{staff.suggestions} suggestions</Badge>
                    <Badge variant="secondary">{staff.interviews} interviews</Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
