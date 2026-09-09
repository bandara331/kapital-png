-- 1. Delete all messages
delete from public.messages;

-- 2. Delete all documents 
delete from public.documents;

-- 3. Delete all reports 
delete from public.reports;

-- 4. Delete all dashboard metrics (Fixes the new foreign key error!)
delete from public.dashboard_metrics;

-- 5. Delete all clients
delete from public.clients;

-- 4. Delete all users from the authentication system EXCEPT the Admin
delete from auth.users 
where email != 'daskapitalltd@gmail.com';
