

-- 4. Create the documents tracking table
create table if not exists documents (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references auth.users(id) not null,
  file_name text not null,
  file_path text not null,
  file_type text,
  file_size integer,
  status text default 'Pending Review' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Set up Row Level Security (RLS) for the documents table
alter table documents enable row level security;

drop policy if exists "Clients can insert their own documents" on documents;
create policy "Clients can insert their own documents"
  on documents for insert
  to authenticated
  with check (auth.uid() = client_id);

drop policy if exists "Clients can view their own documents" on documents;
create policy "Clients can view their own documents"
  on documents for select
  to authenticated
  using (auth.uid() = client_id);

drop policy if exists "Admins can view all documents" on documents;
create policy "Admins can view all documents"
  on documents for select
  to authenticated
  using ( (auth.jwt() ->> 'email') = 'daskapitalltd@gmail.com' );
  
drop policy if exists "Admins can update documents" on documents;
create policy "Admins can update documents"
  on documents for update
  to authenticated
  using ( (auth.jwt() ->> 'email') = 'daskapitalltd@gmail.com' );
