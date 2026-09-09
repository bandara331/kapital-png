-- Drop the old incorrect policies
drop policy if exists "Admins can view all documents" on documents;
drop policy if exists "Admins can update documents" on documents;

-- Create the correct policies using auth.jwt() to securely check the email
create policy "Admins can view all documents"
  on documents for select
  to authenticated
  using ( auth.jwt() ->> 'email' = 'daskapitalltd@gmail.com' );
  
create policy "Admins can update documents"
  on documents for update
  to authenticated
  using ( auth.jwt() ->> 'email' = 'daskapitalltd@gmail.com' );

-- Fix the clients table policy as well so Admin can see the Client Directory!
drop policy if exists "Admins can view all clients" on clients;
create policy "Admins can view all clients"
  on clients for select
  to authenticated
  using ( auth.jwt() ->> 'email' = 'daskapitalltd@gmail.com' );
