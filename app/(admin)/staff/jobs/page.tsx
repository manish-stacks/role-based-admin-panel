'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import mockDb from '@/lib/db/mockDb';
import { useAuth } from '@/lib/hooks/useAuth';
import { filterJobs } from '@/lib/utils/dataFiltering';
import { MapPin, DollarSign } from 'lucide-react';

export default function StaffJobsPage() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  const myJobs = filterJobs('STAFF', currentUser.id);
  const companies = mockDb.companies;

  const getCompanyName = (companyId: string) => {
    return companies.find(c => c.id === companyId)?.name || 'Unknown Company';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="My Assigned Jobs"
        description="Jobs you are assigned to recruit for"
      />

      <div className="px-8 py-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Assigned Jobs ({myJobs.length})
        </h2>

        <div className="grid gap-4">
          {myJobs.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-600">No jobs assigned yet</p>
            </Card>
          ) : (
            myJobs.map((job) => (
              <Card key={job.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <Badge className={
                        job.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }>
                        {job.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {getCompanyName(job.company_id)} • {job.department}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        ${job.salary_min?.toLocaleString()} - ${job.salary_max?.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
