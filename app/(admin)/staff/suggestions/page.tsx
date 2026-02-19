'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import mockDb from '@/lib/db/mockDb';
import { useAuth } from '@/lib/hooks/useAuth';
import { filterSuggestions } from '@/lib/utils/dataFiltering';
import { Plus, Star } from 'lucide-react';

export default function StaffSuggestionsPage() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  const mySuggestions = filterSuggestions('STAFF', currentUser.id);
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
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      case 'Accepted':
        return 'bg-green-100 text-green-800';
      case 'Interview':
        return 'bg-blue-100 text-blue-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="My Suggestions"
        description="Manage your candidate suggestions and feedback"
      />

      <div className="px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">My Suggestions</h2>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Suggestion
          </Button>
        </div>

        <div className="grid gap-4">
          {mySuggestions.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-600">No suggestions yet</p>
            </Card>
          ) : (
            mySuggestions.map((suggestion) => (
              <Card key={suggestion.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {getCandidateName(suggestion.candidate_id)}
                      </h3>
                      <Badge className={getStatusColor(suggestion.status)}>
                        {suggestion.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      For: {getJobTitle(suggestion.job_id)}
                    </p>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(suggestion.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {suggestion.rating}/5
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded p-4 text-sm text-gray-700">
                      <p className="font-medium text-gray-900 mb-1">Notes:</p>
                      <p>{suggestion.notes}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(suggestion.created_at).toLocaleDateString()}
                    </p>
                    <Button variant="outline" size="sm" className="mt-3">
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
