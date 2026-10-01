-- 1. Create admin_settings table
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id integer PRIMARY KEY,
  admin_email text NOT NULL,
  whatsapp_number text,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Insert default row
INSERT INTO public.admin_settings (id, admin_email, whatsapp_number)
VALUES (1, 'daskapitalltd@gmail.com', '+67575388212')
ON CONFLICT (id) DO NOTHING;

-- 2. Create client_meetings table
CREATE TABLE IF NOT EXISTS public.client_meetings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  meeting_date timestamp with time zone NOT NULL,
  meeting_link text NOT NULL,
  meeting_type text NOT NULL,
  status text DEFAULT 'Scheduled',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 3. Set up Row Level Security (RLS) for Admin Settings
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read settings (e.g. to get whatsapp number)
CREATE POLICY "Settings are viewable by everyone." 
  ON public.admin_settings FOR SELECT 
  USING (true);

-- Only admin can update settings
CREATE POLICY "Settings are updatable by admin." 
  ON public.admin_settings FOR UPDATE 
  USING (auth.jwt() ->> 'email' = 'daskapitalltd@gmail.com');

-- 4. Set up Row Level Security (RLS) for Meetings
ALTER TABLE public.client_meetings ENABLE ROW LEVEL SECURITY;

-- Clients can see their own meetings
CREATE POLICY "Clients can view their own meetings." 
  ON public.client_meetings FOR SELECT 
  USING (auth.uid() = client_id);

-- Admin can do everything with meetings
CREATE POLICY "Admin has full access to meetings." 
  ON public.client_meetings FOR ALL 
  USING (auth.jwt() ->> 'email' = 'daskapitalltd@gmail.com');

-- Enable real-time for these tables
alter publication supabase_realtime add table public.clients;
alter publication supabase_realtime add table public.client_meetings;
alter publication supabase_realtime add table public.admin_settings;
