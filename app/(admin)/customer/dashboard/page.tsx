'use client';

import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/admin/StatCard';
import mockDb from '@/lib/db/mockDb';
import { useAuth } from '@/lib/hooks/useAuth';
import { filterJobs, filterSuggestions, filterInterviews, filterOffers } from '@/lib/utils/dataFiltering';
import { Briefcase, Users, Calendar, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CustomerDashboard() {
  const { currentUser } = useAuth();

  if (!currentUser || !currentUser.company_id) return null;

  const myJobs = filterJobs('CUSTOMER', undefined, currentUser.company_id);
  const suggestedCandidates = filterSuggestions('CUSTOMER', undefined, currentUser.company_id);
  const myInterviews = filterInterviews('CUSTOMER', undefined, currentUser.company_id);
  const myOffers = filterOffers('CUSTOMER', undefined, currentUser.company_id);

  const openJobs = myJobs.filter(j => j.status === 'Open').length;
  const scheduledInterviews = myInterviews.filter(i => i.status === 'Scheduled').length;
  const acceptedOffers = myOffers.filter(o => o.status === 'Accepted').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Company HR Dashboard"
        description={`${currentUser.company_name} - Recruitment Overview`}
      />

      <div className="px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Open Jobs"
            value={openJobs}
            icon={Briefcase}
          />
          <StatCard
            title="Suggested Candidates"
            value={suggestedCandidates.length}
            icon={Users}
          />
          <StatCard
            title="Scheduled Interviews"
            value={scheduledInterviews}
            icon={Calendar}
          />
          <StatCard
            title="Accepted Offers"
            value={acceptedOffers}
            icon={CheckCircle}
            changeType="positive"
            change={`${myOffers.length} total offers`}
          />
        </div>

        {/* Quick Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Open Jobs */}
          <Card className="border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Your Open Jobs</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {myJobs.length === 0 ? (
                <div className="p-4 text-gray-500 text-sm">No jobs posted yet</div>
              ) : (
                myJobs.map((job) => (
                  <div key={job.id} className="p-4 hover:bg-gray-50">
                    <p className="font-medium text-gray-900">{job.title}</p>
                    <p className="text-sm text-gray-600">{job.location}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge
                        className={
                          job.status === 'Open'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }
                      >
                        {job.status}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        ${job.salary_min?.toLocaleString()} - ${job.salary_max?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Suggested Candidates */}
          <Card className="border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Suggested Candidates</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {suggestedCandidates.length === 0 ? (
                <div className="p-4 text-gray-500 text-sm">No suggestions yet</div>
              ) : (
                suggestedCandidates.map((suggestion) => {
                  const candidate = mockDb.candidates.find(c => c.id === suggestion.candidate_id);
                  const job = mockDb.jobs.find(j => j.id === suggestion.job_id);
                  return (
                    <div key={suggestion.id} className="p-4 hover:bg-gray-50">
                      <p className="font-medium text-gray-900">{candidate?.name}</p>
                      <p className="text-sm text-gray-600">{job?.title}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {suggestion.status}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          Rating: {suggestion.rating}/5
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
