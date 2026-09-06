import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vxbgjfnnjgazyhvchubg.supabase.co';
const supabaseAnonKey = 'sb_publishable_WUk5DXOeCzrnlGDbDTVY5w_m3HfOehZ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);