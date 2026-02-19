import { UserRole } from '@/lib/auth/types';
import { Job, Suggestion, Interview, Offer, Candidate } from '@/lib/db/types';
import mockDb from '@/lib/db/mockDb';

/**
 * Filter jobs based on user role
 */
export function filterJobs(role: UserRole, userId?: string, companyId?: string): Job[] {
  const jobs = [...mockDb.jobs];
  
  switch (role) {
    case 'SUPER_ADMIN':
      return jobs;
    
    case 'STAFF':
      // Staff sees only jobs assigned to them
      return jobs.filter(job => job.assigned_staff.includes(userId || ''));
    
    case 'CUSTOMER':
      // Customer sees only their company's jobs
      return jobs.filter(job => job.company_id === companyId);
    
    default:
      return [];
  }
}

/**
 * Filter candidates based on user role
 */
export function filterCandidates(role: UserRole, userId?: string, companyId?: string): Candidate[] {
  const candidates = [...mockDb.candidates];
  
  switch (role) {
    case 'SUPER_ADMIN':
    case 'STAFF':
      // Both see all candidates in the pool
      return candidates;
    
    case 'CUSTOMER':
      // Customer sees only candidates suggested to them
      const suggestedIds = mockDb.suggestions
        .filter(s => s.company_id === companyId)
        .map(s => s.candidate_id);
      return candidates.filter(c => suggestedIds.includes(c.id));
    
    default:
      return [];
  }
}

/**
 * Filter suggestions based on user role
 */
export function filterSuggestions(role: UserRole, userId?: string, companyId?: string): Suggestion[] {
  const suggestions = [...mockDb.suggestions];
  
  switch (role) {
    case 'SUPER_ADMIN':
      return suggestions;
    
    case 'STAFF':
      // Staff sees suggestions created by them or assigned to them
      return suggestions.filter(s => s.staff_id === userId);
    
    case 'CUSTOMER':
      // Customer sees suggestions to their company
      return suggestions.filter(s => s.company_id === companyId);
    
    default:
      return [];
  }
}

/**
 * Filter interviews based on user role
 */
export function filterInterviews(role: UserRole, userId?: string, companyId?: string): Interview[] {
  const interviews = [...mockDb.interviews];
  
  switch (role) {
    case 'SUPER_ADMIN':
      return interviews;
    
    case 'STAFF':
      // Staff sees interviews they're conducting
      return interviews.filter(i => i.staff_id === userId);
    
    case 'CUSTOMER':
      // Customer sees interviews for their company
      return interviews.filter(i => i.company_id === companyId);
    
    default:
      return [];
  }
}

/**
 * Filter offers based on user role
 */
export function filterOffers(role: UserRole, userId?: string, companyId?: string): Offer[] {
  const offers = [...mockDb.offers];
  
  switch (role) {
    case 'SUPER_ADMIN':
      return offers;
    
    case 'STAFF':
      // Staff sees offers for jobs they're assigned to
      const assignedJobIds = mockDb.jobs
        .filter(j => j.assigned_staff.includes(userId || ''))
        .map(j => j.id);
      return offers.filter(o => assignedJobIds.includes(o.job_id));
    
    case 'CUSTOMER':
      // Customer sees offers for their company
      return offers.filter(o => o.company_id === companyId);
    
    default:
      return [];
  }
}

/**
 * Get related job for an entity
 */
export function getJobDetails(jobId: string) {
  return mockDb.jobs.find(j => j.id === jobId);
}

/**
 * Get related company for an entity
 */
export function getCompanyDetails(companyId: string) {
  return mockDb.companies.find(c => c.id === companyId);
}

/**
 * Get related candidate for an entity
 */
export function getCandidateDetails(candidateId: string) {
  return mockDb.candidates.find(c => c.id === candidateId);
}
