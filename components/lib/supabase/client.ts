import { createBrowserClient } from "@supabase/ssr";

// Reads from the environment variables you set in .env.local (and in
// Vercel's project settings for the live site). See ENV_SETUP.md at the
// project root for exactly what to set and where to get the values.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase isn't configured yet — set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local. See ENV_SETUP.md."
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
