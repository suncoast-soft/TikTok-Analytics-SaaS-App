create policy "Enable read access for all users"
on "public"."users"
as permissive
for select
to public
using (true);


CREATE TRIGGER sync_seller AFTER UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('https://green-rats-drive.loca.lt/sync-seller', 'POST', '{"Content-type":"application/json"}', '{}', '10000');



