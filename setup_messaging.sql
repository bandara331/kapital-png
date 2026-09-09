-- 1. Create the admin_settings table
create table admin_settings (
  id integer primary key default 1,
  admin_email text not null default 'daskapitalltd@gmail.com',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  -- Ensure only one row ever exists
  constraint single_row check (id = 1)
);

-- Insert the default admin email
insert into admin_settings (id, admin_email) values (1, 'daskapitalltd@gmail.com')
on conflict (id) do nothing;

-- 2. Create the messages table
create table messages (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references auth.users(id) not null,
  content text not null,
  is_from_admin boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Set up Row Level Security for admin_settings
alter table admin_settings enable row level security;

-- Anyone authenticated can read settings
create policy "Anyone can view settings"
  on admin_settings for select
  to authenticated
  using ( true );

-- Admins can update settings
create policy "Admins can update settings"
  on admin_settings for update
  to authenticated
  using ( auth.jwt() ->> 'email' = 'daskapitalltd@gmail.com' );

-- 4. Set up Row Level Security for messages
alter table messages enable row level security;

-- Clients can insert messages (if they are the client)
create policy "Clients can insert their own messages"
  on messages for insert
  to authenticated
  with check (auth.uid() = client_id and is_from_admin = false);

-- Admins can insert messages (to any client)
create policy "Admins can insert any message"
  on messages for insert
  to authenticated
  with check (auth.jwt() ->> 'email' = 'daskapitalltd@gmail.com');

-- Clients can view their own messages
create policy "Clients can view their own messages"
  on messages for select
  to authenticated
  using (auth.uid() = client_id);

-- Admins can view all messages
create policy "Admins can view all messages"
  on messages for select
  to authenticated
  using ( auth.jwt() ->> 'email' = 'daskapitalltd@gmail.com' );

-- 5. Enable Realtime on the messages table
alter publication supabase_realtime add table messages;
