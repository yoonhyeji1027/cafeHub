import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY as string

// Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export {supabase}