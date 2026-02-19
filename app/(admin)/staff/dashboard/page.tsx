'use client';

import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/admin/StatCard';
import mockDb from '@/lib/db/mockDb';
import { useAuth } from '@/lib/hooks/useAuth';
import { filterJobs, filterSuggestions, filterInterviews } from '@/lib/utils/dataFiltering';
import { Briefcase, FileText, Calendar, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function StaffDashboard() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  const myJobs = filterJobs('STAFF', currentUser.id);
  const mySuggestions = filterSuggestions('STAFF', currentUser.id);
  const myInterviews = filterInterviews('STAFF', currentUser.id);
  
  const pendingSuggestions = mySuggestions.filter(s => s.status === 'Pending').length;
  const acceptedSuggestions = mySuggestions.filter(s => s.status === 'Accepted').length;
  const scheduledInterviews = myInterviews.filter(i => i.status === 'Scheduled').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Recruiter Dashboard"
        description={`Welcome back, ${currentUser.name}!`}
      />

      <div className="px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Assigned Jobs"
            value={myJobs.length}
            icon={Briefcase}
          />
          <StatCard
            title="My Suggestions"
            value={mySuggestions.length}
            icon={FileText}
            change={`${pendingSuggestions} pending`}
          />
          <StatCard
            title="Scheduled Interviews"
            value={scheduledInterviews}
            icon={Calendar}
          />
          <StatCard
            title="Suggestion Rate"
            value="92%"
            icon={TrendingUp}
            changeType="positive"
            change="↑ Excellent"
          />
        </div>

        {/* Quick Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Suggestions */}
          <Card className="border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Suggestions</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {mySuggestions.slice(0, 5).map((suggestion) => {
                const candidate = mockDb.candidates.find(c => c.id === suggestion.candidate_id);
                return (
                  <div key={suggestion.id} className="p-4 hover:bg-gray-50">
                    <p className="font-medium text-gray-900">{candidate?.name}</p>
                    <p className="text-sm text-gray-600">{candidate?.title}</p>
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
              })}
            </div>
          </Card>

          {/* Scheduled Interviews */}
          <Card className="border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Interviews</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {myInterviews.filter(i => i.status === 'Scheduled').slice(0, 5).map((interview) => {
                const candidate = mockDb.candidates.find(c => c.id === interview.candidate_id);
                return (
                  <div key={interview.id} className="p-4 hover:bg-gray-50">
                    <p className="font-medium text-gray-900">{candidate?.name}</p>
                    <p className="text-sm text-gray-600">{interview.interview_type} Interview</p>
                    <div className="mt-2 text-xs text-gray-500">
                      {new Date(interview.scheduled_at).toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
