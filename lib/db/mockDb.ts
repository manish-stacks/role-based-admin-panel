'use client';

import { Company, Job, Candidate, Suggestion, Interview, Offer, ActivityLog } from './types';

// Initialize with demo data
export const mockDb = {
  companies: [
    {
      id: 'company-1',
      name: 'TechCorp Inc',
      email: 'hr@techcorp.com',
      industry: 'Technology',
      location: 'San Francisco, CA',
      employees: 500,
      website: 'www.techcorp.com',
      created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'company-2',
      name: 'FinanceHub Ltd',
      email: 'career@financehub.com',
      industry: 'Finance',
      location: 'New York, NY',
      employees: 300,
      website: 'www.financehub.com',
      created_at: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'company-3',
      name: 'DesignStudio Co',
      email: 'jobs@designstudio.co',
      industry: 'Design',
      location: 'Los Angeles, CA',
      employees: 100,
      website: 'www.designstudio.co',
      created_at: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ] as Company[],

  jobs: [
    {
      id: 'job-1',
      company_id: 'company-1',
      title: 'Senior Frontend Engineer',
      description: 'Looking for experienced React/Next.js developer',
      department: 'Engineering',
      salary_min: 120000,
      salary_max: 160000,
      location: 'San Francisco, CA',
      job_type: 'Full-time',
      status: 'Open',
      posted_by: 'super-admin-1',
      assigned_staff: ['staff-1'],
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'job-2',
      company_id: 'company-1',
      title: 'Backend Developer',
      description: 'Node.js, PostgreSQL, AWS experience required',
      department: 'Engineering',
      salary_min: 100000,
      salary_max: 140000,
      location: 'San Francisco, CA',
      job_type: 'Full-time',
      status: 'Open',
      posted_by: 'super-admin-1',
      assigned_staff: ['staff-1'],
      created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'job-3',
      company_id: 'company-2',
      title: 'Financial Analyst',
      description: 'Expert in financial modeling and analysis',
      department: 'Finance',
      salary_min: 80000,
      salary_max: 110000,
      location: 'New York, NY',
      job_type: 'Full-time',
      status: 'Open',
      posted_by: 'super-admin-1',
      assigned_staff: [],
      created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ] as Job[],

  candidates: [
    {
      id: 'candidate-1',
      email: 'alice.dev@email.com',
      name: 'Alice Rodriguez',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      title: 'Full Stack Developer',
      experience_years: 6,
      skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
      created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'candidate-2',
      email: 'bob.engineer@email.com',
      name: 'Bob Anderson',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      title: 'Senior Backend Engineer',
      experience_years: 8,
      skills: ['Python', 'Java', 'Kubernetes', 'Docker', 'AWS'],
      created_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'candidate-3',
      email: 'carol.designer@email.com',
      name: 'Carol Martinez',
      phone: '+1 (555) 345-6789',
      location: 'New York, NY',
      title: 'UX Designer',
      experience_years: 4,
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      created_at: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'candidate-4',
      email: 'david.analyst@email.com',
      name: 'David Chen',
      phone: '+1 (555) 456-7890',
      location: 'New York, NY',
      title: 'Financial Analyst',
      experience_years: 5,
      skills: ['Excel', 'Python', 'Financial Modeling', 'SQL'],
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ] as Candidate[],

  suggestions: [
    {
      id: 'suggestion-1',
      job_id: 'job-1',
      candidate_id: 'candidate-1',
      staff_id: 'staff-1',
      company_id: 'company-1',
      rating: 4.5,
      notes: 'Excellent fit, great portfolio and experience',
      status: 'Pending',
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'suggestion-2',
      job_id: 'job-2',
      candidate_id: 'candidate-2',
      staff_id: 'staff-1',
      company_id: 'company-1',
      rating: 5,
      notes: 'Perfect match for backend role, strong background',
      status: 'Interview',
      created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ] as Suggestion[],

  interviews: [
    {
      id: 'interview-1',
      job_id: 'job-1',
      candidate_id: 'candidate-1',
      company_id: 'company-1',
      staff_id: 'staff-1',
      scheduled_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      duration_minutes: 60,
      interview_type: 'Technical',
      status: 'Scheduled',
      sla_deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'interview-2',
      job_id: 'job-2',
      candidate_id: 'candidate-2',
      company_id: 'company-1',
      staff_id: 'staff-1',
      scheduled_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      duration_minutes: 45,
      interview_type: 'Video',
      status: 'Scheduled',
      sla_deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ] as Interview[],

  offers: [
    {
      id: 'offer-1',
      job_id: 'job-1',
      candidate_id: 'candidate-1',
      company_id: 'company-1',
      salary: 140000,
      start_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Pending',
      notes: 'Competitive offer with signing bonus',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ] as Offer[],

  activityLogs: [] as ActivityLog[],
};

// Helper functions for data access
export function logActivity(
  userId: string,
  userName: string,
  action: string,
  entityType: string,
  entityId: string,
  description: string,
  companyId?: string
) {
  const log: ActivityLog = {
    id: `log-${Date.now()}`,
    user_id: userId,
    user_name: userName,
    action,
    entity_type: entityType,
    entity_id: entityId,
    description,
    timestamp: new Date().toISOString(),
    company_id: companyId,
  };
  mockDb.activityLogs.push(log);
  return log;
}

export function getActivityLogs(userId?: string, companyId?: string): ActivityLog[] {
  let logs = [...mockDb.activityLogs];
  if (userId) logs = logs.filter(log => log.user_id === userId);
  if (companyId) logs = logs.filter(log => log.company_id === companyId);
  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

// Export the mock database
export default mockDb;
