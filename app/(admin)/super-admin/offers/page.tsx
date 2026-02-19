'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import mockDb from '@/lib/db/mockDb';
import { DollarSign, Calendar } from 'lucide-react';

export default function OffersPage() {
  const offers = mockDb.offers;
  const candidates = mockDb.candidates;
  const jobs = mockDb.jobs;

  const getCandidateName = (candidateId: string) => {
    return candidates.find(c => c.id === candidateId)?.name || 'Unknown';
  };

  const getJobTitle = (jobId: string) => {
    return jobs.find(j => j.id === jobId)?.title || 'Unknown';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Offers"
        description="Manage all job offers"
      />

      <div className="px-8 py-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Offers ({offers.length})
        </h2>

        <div className="grid gap-4">
          {offers.map((offer) => (
            <Card key={offer.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {getCandidateName(offer.candidate_id)}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {getJobTitle(offer.job_id)}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      ${offer.salary.toLocaleString()} /year
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      Start: {new Date(offer.start_date).toLocaleDateString()}
                    </div>
                    <Badge className={getStatusColor(offer.status)}>
                      {offer.status}
                    </Badge>
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
