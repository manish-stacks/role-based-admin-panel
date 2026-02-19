export interface Company {
  id: string;
  name: string;
  email: string;
  industry: string;
  location: string;
  employees: number;
  website?: string;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  company_id: string;
  title: string;
  description: string;
  department: string;
  salary_min: number;
  salary_max: number;
  location: string;
  job_type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  status: 'Open' | 'Closed' | 'On Hold';
  posted_by: string;
  assigned_staff: string[];
  created_at: string;
  updated_at: string;
}

export interface Candidate {
  id: string;
  email: string;
  name: string;
  phone: string;
  location: string;
  title: string;
  experience_years: number;
  skills: string[];
  resume_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Suggestion {
  id: string;
  job_id: string;
  candidate_id: string;
  staff_id: string;
  company_id: string;
  rating: number; // 1-5
  notes: string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Interview';
  created_at: string;
  updated_at: string;
}

export interface Interview {
  id: string;
  job_id: string;
  candidate_id: string;
  company_id: string;
  staff_id?: string;
  scheduled_at: string;
  duration_minutes: number;
  interview_type: 'Phone' | 'Video' | 'In-Person' | 'Technical';
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  feedback?: string;
  rating?: number;
  sla_deadline?: string; // For SLA tracking
  created_at: string;
  updated_at: string;
}

export interface Offer {
  id: string;
  job_id: string;
  candidate_id: string;
  company_id: string;
  salary: number;
  start_date: string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Expired';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  user_name: string;
  action: string;
  entity_type: string;
  entity_id: string;
  description: string;
  timestamp: string;
  company_id?: string;
}

export type Entity = 
  | Company 
  | Job 
  | Candidate 
  | Suggestion 
  | Interview 
  | Offer 
  | ActivityLog;
