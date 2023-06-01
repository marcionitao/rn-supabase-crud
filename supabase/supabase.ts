import { createClient } from '@supabase/supabase-js';
import {
  REACT_APP_SUPABASE_PUBLIC_KEY,
  REACT_APP_SUPABASE_PUBLIC_URL,
} from '@env';
//
const supabaseUrl = REACT_APP_SUPABASE_PUBLIC_URL;
const supabaseKey = REACT_APP_SUPABASE_PUBLIC_KEY;
//
export const supabase = createClient(supabaseUrl, supabaseKey);
