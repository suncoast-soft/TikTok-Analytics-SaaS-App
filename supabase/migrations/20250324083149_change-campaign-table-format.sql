alter table "public"."campaigns" add column "end_time" numeric;

alter table "public"."campaigns" add column "free_sample_rule" boolean default true;

alter table "public"."campaigns" add column "message" text;

alter table "public"."campaigns" add column "name" text;

alter table "public"."campaigns" add column "start_time" numeric;

alter table "public"."campaigns" add column "user_id" uuid;

alter table "public"."campaigns" add constraint "campaigns_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."campaigns" validate constraint "campaigns_user_id_fkey";

create policy "Enable insert for authenticated users only"
on "public"."campaigns"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."campaigns"
as permissive
for select
to public
using (true);


create policy "Enable update for authenticated users only"
on "public"."campaigns"
as permissive
for update
to authenticated
using (true)
with check (true);




