'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import mockDb from '@/lib/db/mockDb';
import { Calendar, Clock } from 'lucide-react';

export default function InterviewsPage() {
  const interviews = mockDb.interviews;
  const candidates = mockDb.candidates;
  const jobs = mockDb.jobs;

  const getCandidateName = (candidateId: string) => {
    return candidates.find(c => c.id === candidateId)?.name || 'Unknown';
  };

  const getJobTitle = (jobId: string) => {
    return jobs.find(j => j.id === jobId)?.title || 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="All Interviews"
        description="System-wide interview management"
      />

      <div className="px-8 py-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Interviews ({interviews.length})
        </h2>

        <div className="grid gap-4">
          {interviews.map((interview) => (
            <Card key={interview.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {getCandidateName(interview.candidate_id)}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {getJobTitle(interview.job_id)}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {new Date(interview.scheduled_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      {interview.duration_minutes}m
                    </div>
                    <Badge variant="secondary">{interview.interview_type}</Badge>
                    <Badge>{interview.status}</Badge>
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
