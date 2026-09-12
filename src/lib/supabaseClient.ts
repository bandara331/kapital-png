import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

// Each browser tab/window gets its own isolated client instance.
// This prevents session bleed between different logged-in users.
function createClient() {
  return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
}

// Singleton per browser window — uses window-scoped storage so
// different browser windows (or browser profiles) each get their
// own independent session stored in their own localStorage.
let _client: ReturnType<typeof createBrowserClient> | null = null;

export const supabase = (() => {
  if (typeof window === 'undefined') {
    // Server-side: always create fresh (no singleton)
    return createClient();
  }
  // Client-side: one instance per browser window/tab
  if (!_client) {
    _client = createClient();
  }
  return _client;
})();
