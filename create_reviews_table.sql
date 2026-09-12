-- Run this in your Supabase SQL Editor
-- Creates the reviews table with RLS policies

CREATE TABLE IF NOT EXISTS public.reviews (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL,
  role          TEXT,
  company       TEXT,
  industry      TEXT,
  quote         TEXT NOT NULL,
  rating        SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  approved      BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved reviews
CREATE POLICY "Public can read approved reviews"
  ON public.reviews FOR SELECT
  USING (approved = true);

-- Anyone can submit a review (insert)
CREATE POLICY "Public can submit reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (true);

-- Enable realtime for the reviews table
ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;
