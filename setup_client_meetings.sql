-- Create the client_meetings table
CREATE TABLE IF NOT EXISTS public.client_meetings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    meeting_date TIMESTAMP WITH TIME ZONE NOT NULL,
    meeting_link TEXT NOT NULL,
    status TEXT DEFAULT 'Scheduled',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.client_meetings ENABLE ROW LEVEL SECURITY;

-- Clients can view their own meetings
CREATE POLICY "Clients can view own meetings"
    ON public.client_meetings FOR SELECT
    USING (auth.uid() = client_id);

-- Admin can manage all meetings
CREATE POLICY "Admin can manage all meetings"
    ON public.client_meetings FOR ALL
    USING (auth.jwt() ->> 'email' = 'daskapitalltd@gmail.com');
