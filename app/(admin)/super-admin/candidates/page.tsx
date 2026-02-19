'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import mockDb from '@/lib/db/mockDb';
import { Button } from '@/components/ui/button';
import { Plus, Mail, Phone, MapPin, Briefcase } from 'lucide-react';

export default function SuperAdminCandidatesPage() {
  const candidates = mockDb.candidates;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Candidate Pool"
        description="Manage all candidates in the system"
      />

      <div className="px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">All Candidates</h2>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Candidate
          </Button>
        </div>

        <div className="grid gap-4">
          {candidates.map((candidate) => (
            <Card key={candidate.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{candidate.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{candidate.title}</p>

                  <div className="flex items-center gap-6 text-sm mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      {candidate.email}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      {candidate.phone}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {candidate.location}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Briefcase className="w-4 h-4" />
                      {candidate.experience_years} years experience
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Added {new Date(candidate.created_at).toLocaleDateString()}
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    View Profile
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
