/**
 * Supabase client for portfolio data.
 * Requires REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Log project hint in dev (helps verify you're viewing the correct Supabase project)
if (isSupabaseConfigured && typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const projectHint = supabaseUrl.replace(/^https:\/\//, '').replace(/\.supabase\.co.*$/, '');
  console.log('[Supabase] Project:', projectHint + '.supabase.co');
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
