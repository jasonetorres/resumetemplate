import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getUserId = (): string => {
  let userId = localStorage.getItem('resumeUserId');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('resumeUserId', userId);
  }
  return userId;
};
