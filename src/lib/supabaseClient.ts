import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Business = {
  id: string;
  name: string;
  active: boolean;
  created_at: string;
};

export type Response = {
  id: string;
  business_id: string;
  rating: number;
  review: string;
  name: string;
  email: string;
  created_at: string;
  google_reviewed: boolean;
};

export type Role = {
  id: string;
  name: 'super_admin' | 'business_admin';
  created_at: string;
};

export type User = {
  id: string;
  email: string;
  role_id: string;
  business_id?: string;
  active: boolean;
  created_at: string;
};