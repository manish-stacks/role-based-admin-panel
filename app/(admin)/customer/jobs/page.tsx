'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import mockDb from '@/lib/db/mockDb';
import { useAuth } from '@/lib/hooks/useAuth';
import { filterJobs } from '@/lib/utils/dataFiltering';
import { Button } from '@/components/ui/button';
import { Plus, MapPin, DollarSign } from 'lucide-react';

export default function CustomerJobsPage() {
  const { currentUser } = useAuth();

  if (!currentUser || !currentUser.company_id) return null;

  const myJobs = filterJobs('CUSTOMER', undefined, currentUser.company_id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Your Job Postings"
        description="Manage your company's open positions"
      />

      <div className="px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">All Jobs</h2>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </div>

        <div className="grid gap-4">
          {myJobs.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-600">No jobs posted yet</p>
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
                      {job.department} • {job.job_type}
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

                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
