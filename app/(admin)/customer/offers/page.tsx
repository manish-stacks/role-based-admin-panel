'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import mockDb from '@/lib/db/mockDb';
import { useAuth } from '@/lib/hooks/useAuth';
import { filterOffers } from '@/lib/utils/dataFiltering';
import { DollarSign, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CustomerOffersPage() {
  const { currentUser } = useAuth();

  if (!currentUser || !currentUser.company_id) return null;

  const myOffers = filterOffers('CUSTOMER', undefined, currentUser.company_id);
  const candidates = mockDb.candidates;

  const getCandidateName = (candidateId: string) => {
    return candidates.find(c => c.id === candidateId)?.name || 'Unknown';
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
        description="Track and manage job offers to candidates"
      />

      <div className="px-8 py-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Offers ({myOffers.length})
        </h2>

        <div className="grid gap-4">
          {myOffers.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-600">No offers sent yet</p>
            </Card>
          ) : (
            myOffers.map((offer) => (
              <Card key={offer.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-6">
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
                        Start: {new Date(offer.start_date).toLocaleDateString()}
                      </div>
                      <Badge className={getStatusColor(offer.status)}>
                        {offer.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {offer.status === 'Pending' && (
                      <>
                        <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                          Approve
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
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
