-- Add meeting_link column to clients table if it doesn't exist
alter table public.clients
add column if not exists meeting_link text;
