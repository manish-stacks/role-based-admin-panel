'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import mockDb from '@/lib/db/mockDb';
import { useAuth } from '@/lib/hooks/useAuth';
import { filterOffers } from '@/lib/utils/dataFiltering';
import { DollarSign, Calendar } from 'lucide-react';

export default function StaffOffersPage() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  const myOffers = filterOffers('STAFF', currentUser.id);
  const candidates = mockDb.candidates;

  const getCandidateName = (candidateId: string) => {
    return candidates.find(c => c.id === candidateId)?.name || 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Offers"
        description="Track offers for your assigned jobs"
      />

      <div className="px-8 py-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          My Offers ({myOffers.length})
        </h2>

        <div className="grid gap-4">
          {myOffers.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-600">No offers yet</p>
            </Card>
          ) : (
            myOffers.map((offer) => (
              <Card key={offer.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {getCandidateName(offer.candidate_id)}
                    </h3>
                    
                    <div className="flex items-center gap-6 text-sm mt-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        ${offer.salary.toLocaleString()} /year
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(offer.start_date).toLocaleDateString()}
                      </div>
                      <Badge>{offer.status}</Badge>
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
