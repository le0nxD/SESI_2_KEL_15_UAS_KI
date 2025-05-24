import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zwtylasmrhantywjeswf.supabase.co'; // ganti dengan URL Anda
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3dHlsYXNtcmhhbnR5d2plc3dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMjcxMzMsImV4cCI6MjA2MjkwMzEzM30.fx8uuAag1Bm6akDxYJOtdopzWjwxsrzw5Q72ryUhSWY'; // ganti dengan ANON KEY Anda

export const supabase = createClient(supabaseUrl, supabaseKey);
