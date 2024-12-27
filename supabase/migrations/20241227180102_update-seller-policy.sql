drop policy "Enable read for authenticated users only" on "public"."sellers";

drop policy "Enable update for users based on user_id" on "public"."sellers";

CREATE UNIQUE INDEX sellers_seller_name_key ON public.sellers USING btree (seller_name);

alter table "public"."sellers" add constraint "sellers_seller_name_key" UNIQUE using index "sellers_seller_name_key";

create policy "Enable read access for all users"
on "public"."sellers"
as permissive
for select
to public
using (true);


create policy "Enable update access for all users"
on "public"."sellers"
as permissive
for update
to public
using (true)
with check (true);




