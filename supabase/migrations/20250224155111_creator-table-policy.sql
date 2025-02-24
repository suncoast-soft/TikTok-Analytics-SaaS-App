alter table "public"."creators" drop column "seller_name";

alter table "public"."creators" drop column "shop_cipher";

create policy "Enable insert for users based on user_id"
on "public"."creators"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable update for users based on user_id"
on "public"."creators"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable users to view their own data only"
on "public"."creators"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));




