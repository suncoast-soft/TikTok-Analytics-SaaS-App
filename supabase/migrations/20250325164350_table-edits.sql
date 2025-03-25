drop policy "Can view own user data." on "public"."users";

create policy "Enable select for authenticated users only"
on "public"."users"
as permissive
for select
to authenticated
using (true);




