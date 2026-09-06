import { createClient } from '@supabase/supabase-js';

// Read from environment variables if set (e.g. on Vercel), otherwise fallback to the configured project credentials
const metaEnv = typeof import.meta !== 'undefined' ? (import.meta as any).env : undefined;
const supabaseUrl = metaEnv?.VITE_SUPABASE_URL || 'https://vxbgjfnnjgazyhvchubg.supabase.co';
const supabaseAnonKey = metaEnv?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_WUk5DXOeCzrnlGDbDTVY5w_m3HfOehZ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
