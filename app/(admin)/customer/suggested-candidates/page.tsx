'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import mockDb from '@/lib/db/mockDb';
import { useAuth } from '@/lib/hooks/useAuth';
import { filterSuggestions } from '@/lib/utils/dataFiltering';
import { Mail, Phone, MapPin, Star } from 'lucide-react';

export default function CustomerSuggestedCandidatesPage() {
  const { currentUser } = useAuth();

  if (!currentUser || !currentUser.company_id) return null;

  const suggestions = filterSuggestions('CUSTOMER', undefined, currentUser.company_id);
  const candidates = mockDb.candidates;
  const jobs = mockDb.jobs;

  const getCandidateDetails = (candidateId: string) => {
    return candidates.find(c => c.id === candidateId);
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
        title="Suggested Candidates"
        description="Review and manage candidate suggestions from our recruiters"
      />

      <div className="px-8 py-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Candidates ({suggestions.length})
        </h2>

        <div className="grid gap-4">
          {suggestions.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-600">No suggested candidates yet</p>
            </Card>
          ) : (
            suggestions.map((suggestion) => {
              const candidate = getCandidateDetails(suggestion.candidate_id);
              if (!candidate) return null;

              return (
                <Card key={suggestion.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {candidate.name}
                        </h3>
                        <Badge className={getStatusColor(suggestion.status)}>
                          {suggestion.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        Position: {getJobTitle(suggestion.job_id)}
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        {candidate.title} • {candidate.experience_years} years experience
                      </p>

                      <div className="flex items-center gap-6 text-sm mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          {candidate.email}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          {candidate.phone}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {candidate.location}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {candidate.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="bg-gray-50 rounded p-4 text-sm">
                        <p className="font-medium text-gray-900 mb-1">Recruiter Notes:</p>
                        <p className="text-gray-700">{suggestion.notes}</p>
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(suggestion.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-xs text-gray-600 ml-1">
                            {suggestion.rating}/5
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                        Accept & Interview
                      </Button>
                      <Button variant="outline" size="sm">
                        View Full Profile
                      </Button>
                      <Button variant="destructive" size="sm">
                        Decline
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
