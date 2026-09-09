-- Create the client_documents bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('client_documents', 'client_documents', false)
on conflict (id) do nothing;

-- Enable RLS on storage objects
alter table storage.objects enable row level security;

-- Drop existing policies if any to avoid errors when re-running
drop policy if exists "Clients can upload their own documents" on storage.objects;
drop policy if exists "Clients can view their own documents" on storage.objects;
drop policy if exists "Admins can view all documents" on storage.objects;
drop policy if exists "Admins can upload documents" on storage.objects;

-- Policy: Clients can upload to their own folder (bucket_id = client_documents, path begins with their user id)
create policy "Clients can upload their own documents"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'client_documents' and
  auth.uid()::text = (string_to_array(name, '/'))[1]
);

-- Policy: Clients can view their own documents
create policy "Clients can view their own documents"
on storage.objects for select
to authenticated
using (
  bucket_id = 'client_documents' and
  auth.uid()::text = (string_to_array(name, '/'))[1]
);

-- Policy: Admins can view all documents
create policy "Admins can view all documents"
on storage.objects for select
to authenticated
using (
  bucket_id = 'client_documents' and
  auth.jwt() ->> 'email' = 'daskapitalltd@gmail.com'
);

-- Policy: Admins can upload documents anywhere
create policy "Admins can upload documents"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'client_documents' and
  auth.jwt() ->> 'email' = 'daskapitalltd@gmail.com'
);
