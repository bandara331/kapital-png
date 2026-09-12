-- Update clients table to backfill emails from auth.users
update public.clients c
set email = (
  select u.email 
  from auth.users u 
  where u.id = c.id
)
where c.email is null;
