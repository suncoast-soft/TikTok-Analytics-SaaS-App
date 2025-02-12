drop policy "Enable users to view their own data only" on "public"."sellers";

create table "public"."creators" (
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "access_token" text,
    "access_token_expire_at" numeric,
    "refresh_token" text,
    "refresh_token_expire_at" numeric,
    "seller_name" text,
    "shop_cipher" text
);


alter table "public"."creators" enable row level security;

CREATE UNIQUE INDEX creators_pkey ON public.creators USING btree (user_id);

CREATE UNIQUE INDEX creators_user_id_key ON public.creators USING btree (user_id);

alter table "public"."creators" add constraint "creators_pkey" PRIMARY KEY using index "creators_pkey";

alter table "public"."creators" add constraint "creators_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."creators" validate constraint "creators_user_id_fkey";

alter table "public"."creators" add constraint "creators_user_id_key" UNIQUE using index "creators_user_id_key";

grant delete on table "public"."creators" to "anon";

grant insert on table "public"."creators" to "anon";

grant references on table "public"."creators" to "anon";

grant select on table "public"."creators" to "anon";

grant trigger on table "public"."creators" to "anon";

grant truncate on table "public"."creators" to "anon";

grant update on table "public"."creators" to "anon";

grant delete on table "public"."creators" to "authenticated";

grant insert on table "public"."creators" to "authenticated";

grant references on table "public"."creators" to "authenticated";

grant select on table "public"."creators" to "authenticated";

grant trigger on table "public"."creators" to "authenticated";

grant truncate on table "public"."creators" to "authenticated";

grant update on table "public"."creators" to "authenticated";

grant delete on table "public"."creators" to "service_role";

grant insert on table "public"."creators" to "service_role";

grant references on table "public"."creators" to "service_role";

grant select on table "public"."creators" to "service_role";

grant trigger on table "public"."creators" to "service_role";

grant truncate on table "public"."creators" to "service_role";

grant update on table "public"."creators" to "service_role";

create policy "Enable read for authenticated users only"
on "public"."sellers"
as permissive
for select
to authenticated
using (true);




