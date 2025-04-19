
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://olcsrjbbwhhsvodhmqkj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sY3NyamJid2hoc3ZvZGhtcWtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3NzE4OTQsImV4cCI6MjA2MDM0Nzg5NH0.qDTJKjXJBDpZNa7tsIADeiqLMihIpOjrWmSquK3wYUI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
