import {createClient} from "@supabase/supabase-js";

const supabaseURL = "https://gneflkvexcbprieysobo.supabase.co";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduZWZsa3ZleGNicHJpZXlzb2JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ1MzI3MDAsImV4cCI6MTk4MDEwODcwMH0.5vnSc5mJRvM2JTdb4enlFUBZ9Mu2dgFBkHkUHnql7SI";

export const supabase = createClient(supabaseURL, anonKey);