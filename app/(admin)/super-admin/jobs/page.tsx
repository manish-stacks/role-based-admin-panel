'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import mockDb from '@/lib/db/mockDb';
import { Button } from '@/components/ui/button';
import { Plus, MapPin, DollarSign } from 'lucide-react';

export default function SuperAdminJobsPage() {
  const jobs = mockDb.jobs;
  const companies = mockDb.companies;

  const getCompanyName = (companyId: string) => {
    return companies.find(c => c.id === companyId)?.name || 'Unknown Company';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-800';
      case 'Closed':
        return 'bg-red-100 text-red-800';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Jobs Management"
        description="Manage all job postings across the system"
      />

      <div className="px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">All Jobs</h2>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Job
          </Button>
        </div>

        <div className="grid gap-4">
          {jobs.map((job) => (
            <Card key={job.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <Badge className={getStatusColor(job.status)}>
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
                    <div className="text-gray-600">
                      {job.job_type}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs text-gray-500">Assigned to:</span>
                    <div className="flex gap-1">
                      {job.assigned_staff.length > 0 ? (
                        job.assigned_staff.map((staffId) => (
                          <Badge key={staffId} variant="secondary" className="text-xs">
                            {staffId === 'staff-1' ? 'Michael Chen' : staffId}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-gray-500 italic">Unassigned</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {new Date(job.created_at).toLocaleDateString()}
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
