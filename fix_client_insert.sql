-- Allow authenticated users to insert a row into the clients table
-- but ONLY if the 'id' of the row matches their own auth user id!

drop policy if exists "Users can insert their own client record" on clients;

create policy "Users can insert their own client record"
  on clients for insert
  to authenticated
  with check ( auth.uid() = id );
