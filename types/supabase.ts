// This file is a placeholder for Supabase generated types.
// Run `npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/supabase.ts`
// after setting up your Supabase project for full type safety.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: 'crew' | 'employer';
          full_name: string | null;
          email: string | null;
          phone: string | null;
          nationality: string | null;
          location: string | null;
          avatar_url: string | null;
          bio: string | null;

          // Crew-specific
          experience_years: number | null;
          position: string | null; // e.g. Captain, Chief Stewardess, etc.

          // Employer-specific
          company_name: string | null;
          yacht_name: string | null;
          yacht_size: number | null;
          fleet_size: number | null;

          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      certificates: {
        Row: {
          id: string;
          user_id: string;
          file_url: string;
          file_name: string;
          certificate_type: string; // e.g. STCW, ENG1, Passport
          status: 'pending' | 'under_review' | 'verified' | 'rejected';
          verification_notes: string | null;
          uploaded_at: string;
        };
        Insert: Omit<Database['public']['Tables']['certificates']['Row'], 'id' | 'uploaded_at'>;
        Update: Partial<Database['public']['Tables']['certificates']['Insert']>;
      };
      jobs: {
        Row: {
          id: string;
          employer_id: string;
          title: string;
          position: string;
          yacht_type: string;
          location: string;
          start_date: string | null;
          duration: string | null;
          salary_range: string | null;
          requirements: string[];
          description: string;
          status: 'open' | 'filled' | 'closed';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['jobs']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['jobs']['Insert']>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: 'crew' | 'employer';
      certificate_status: 'pending' | 'under_review' | 'verified' | 'rejected';
    };
  };
}
