-- Add columns for the Admin to reply to client documents
alter table documents 
add column if not exists admin_reply text,
add column if not exists reply_read_by_client boolean default false;
