export * from './supabase';

export interface CrewProfile {
  id: string;
  userId: string;
  fullName: string;
  position: string;
  yearsExperience: number;
  certifications: string[];
  preferredYachtTypes: string[];
  languages: string[];
  bio?: string;
  hourlyRate?: number;
  availability: 'immediate' | '1-month' | '3-months' | 'seasonal';
  verified: boolean;
  location?: string;
  photoUrl?: string;
}

export interface EmployerProfile {
  id: string;
  userId: string;
  companyName: string;
  contactName: string;
  yachtName?: string;
  fleetSize: number;
  location: string;
  verified: boolean;
}

export interface Job {
  id: string;
  employerId: string;
  title: string;
  position: string;
  yachtType: string;
  location: string;
  startDate: string;
  duration: string;
  salaryRange: string;
  requirements: string[];
  description: string;
  status: 'open' | 'filled' | 'closed';
  createdAt: string;
}

export interface Match {
  id: string;
  jobId: string;
  crewId: string;
  score: number;
  reasons: string[];
  status: 'suggested' | 'contacted' | 'interviewing' | 'hired' | 'declined';
}
