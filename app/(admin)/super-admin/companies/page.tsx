'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import mockDb from '@/lib/db/mockDb';
import { Button } from '@/components/ui/button';
import { Plus, Users, Globe } from 'lucide-react';

export default function CompaniesPage() {
  const companies = mockDb.companies;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Companies"
        description="Manage all companies using the platform"
      />

      <div className="px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">All Companies</h2>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Company
          </Button>
        </div>

        <div className="grid gap-4">
          {companies.map((company) => (
            <Card key={company.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{company.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{company.industry}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {company.employees} employees
                    </div>
                    {company.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        {company.website}
                      </div>
                    )}
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
