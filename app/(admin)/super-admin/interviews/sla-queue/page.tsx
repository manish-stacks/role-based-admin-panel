'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import mockDb from '@/lib/db/mockDb';
import { SLATimer } from '@/components/admin/SLATimer';
import { Button } from '@/components/ui/button';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import { calculateSLA } from '@/lib/utils/slaCalculator';

export default function InterviewsSLAQueuePage() {
  const interviews = mockDb.interviews.filter(i => i.status === 'Scheduled' && i.sla_deadline);
  const candidates = mockDb.candidates;
  const jobs = mockDb.jobs;

  const getCandidateName = (candidateId: string) => {
    return candidates.find(c => c.id === candidateId)?.name || 'Unknown Candidate';
  };

  const getJobTitle = (jobId: string) => {
    return jobs.find(j => j.id === jobId)?.title || 'Unknown Job';
  };

  // Sort by SLA deadline (urgent first)
  const sortedInterviews = interviews.sort((a, b) => {
    const aDeadline = new Date(a.sla_deadline || '').getTime();
    const bDeadline = new Date(b.sla_deadline || '').getTime();
    return aDeadline - bDeadline;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Interview SLA Queue"
        description="Track interview scheduling deadlines with real-time SLA countdown"
      />

      <div className="px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span>Critical (0-1h)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span>Warning (0-24h)</span>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {sortedInterviews.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-600">No scheduled interviews with SLA deadlines</p>
            </Card>
          ) : (
            sortedInterviews.map((interview) => {
              const sla = interview.sla_deadline ? calculateSLA(interview.sla_deadline) : null;
              const bgColor = sla?.isExpired 
                ? 'bg-red-50 border-red-200' 
                : sla?.isCritical 
                ? 'bg-orange-50 border-orange-200' 
                : sla?.isWarning 
                ? 'bg-yellow-50 border-yellow-200' 
                : 'bg-white';

              return (
                <Card key={interview.id} className={`p-6 border transition-colors ${bgColor}`}>
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {getCandidateName(interview.candidate_id)}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Position: {getJobTitle(interview.job_id)}
                      </p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Type:</span>
                          <Badge variant="secondary">{interview.interview_type}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Scheduled:</span>
                          <span className="font-medium">
                            {new Date(interview.scheduled_at).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Duration:</span>
                          <span>{interview.duration_minutes} minutes</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                      {interview.sla_deadline && (
                        <div className="text-center">
                          <p className="text-xs text-gray-600 mb-2">SLA Deadline</p>
                          <SLATimer deadline={interview.sla_deadline} showLabel={false} />
                        </div>
                      )}
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
