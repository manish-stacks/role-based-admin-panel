'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import mockDb from '@/lib/db/mockDb';
import { useAuth } from '@/lib/hooks/useAuth';
import { filterInterviews } from '@/lib/utils/dataFiltering';
import { SLATimer } from '@/components/admin/SLATimer';
import { Calendar, Clock } from 'lucide-react';

export default function StaffInterviewsPage() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  const myInterviews = filterInterviews('STAFF', currentUser.id);
  const candidates = mockDb.candidates;
  const jobs = mockDb.jobs;

  const getCandidateName = (candidateId: string) => {
    return candidates.find(c => c.id === candidateId)?.name || 'Unknown Candidate';
  };

  const getJobTitle = (jobId: string) => {
    return jobs.find(j => j.id === jobId)?.title || 'Unknown Job';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="My Interviews"
        description="Manage your scheduled and completed interviews"
      />

      <div className="px-8 py-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Interviews ({myInterviews.length})
        </h2>

        <div className="grid gap-4">
          {myInterviews.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-600">No interviews scheduled</p>
            </Card>
          ) : (
            myInterviews.map((interview) => (
              <Card key={interview.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {getCandidateName(interview.candidate_id)}
                      </h3>
                      <Badge className={getStatusColor(interview.status)}>
                        {interview.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Position: {getJobTitle(interview.job_id)}
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(interview.scheduled_at).toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        {interview.duration_minutes} minutes
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        Type: <Badge variant="secondary">{interview.interview_type}</Badge>
                      </div>
                    </div>

                    {interview.sla_deadline && (
                      <div className="mt-4 p-3 bg-gray-100 rounded flex items-center justify-between">
                        <span className="text-xs text-gray-600 font-medium">SLA Deadline</span>
                        <SLATimer deadline={interview.sla_deadline} />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    {interview.status === 'Scheduled' && (
                      <>
                        <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                          Join Interview
                        </Button>
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="destructive" size="sm">
                          Cancel
                        </Button>
                      </>
                    )}
                    {interview.status === 'Completed' && (
                      <Button variant="outline" size="sm">
                        View Feedback
                      </Button>
                    )}
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
