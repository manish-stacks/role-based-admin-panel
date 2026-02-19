'use client';

import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/admin/StatCard';
import { ActivityLog } from '@/components/admin/ActivityLog';
import mockDb from '@/lib/db/mockDb';
import { Users, Briefcase, Calendar, CheckCircle } from 'lucide-react';

export default function SuperAdminDashboard() {
  const totalCompanies = mockDb.companies.length;
  const totalJobs = mockDb.jobs.length;
  const totalCandidates = mockDb.candidates.length;
  const totalInterviews = mockDb.interviews.length;
  const scheduledInterviews = mockDb.interviews.filter(i => i.status === 'Scheduled').length;
  const totalOffers = mockDb.offers.length;
  const recentLogs = mockDb.activityLogs.slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Super Admin Dashboard"
        description="System overview and management tools"
      />

      <div className="px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Companies"
            value={totalCompanies}
            icon={Users}
          />
          <StatCard
            title="Open Jobs"
            value={totalJobs}
            icon={Briefcase}
            change={`${totalJobs} active`}
          />
          <StatCard
            title="Candidates"
            value={totalCandidates}
            icon={Users}
          />
          <StatCard
            title="Scheduled Interviews"
            value={scheduledInterviews}
            icon={Calendar}
            change={`${totalInterviews} total`}
          />
        </div>

        {/* Second Row of Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Offers"
            value={totalOffers}
            icon={CheckCircle}
          />
          <StatCard
            title="Staff Members"
            value="1"
            icon={Users}
          />
          <StatCard
            title="Conversion Rate"
            value="45%"
            icon={CheckCircle}
            changeType="positive"
            change="↑ 12% from last month"
          />
          <StatCard
            title="Avg Time to Hire"
            value="18 days"
            icon={Calendar}
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <ActivityLog logs={recentLogs} limit={15} />
        </div>
      </div>
    </div>
  );
}
