create type "public"."user_type" as enum ('creator', 'seller');

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

create table "public"."sellers" (
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "access_token" text,
    "access_token_expire_at" numeric,
    "refresh_token" text,
    "refresh_token_expire_at" numeric,
    "seller_name" text,
    "shop_cipher" text
);


alter table "public"."sellers" enable row level security;

create table "public"."subscriptions" (
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "subscription_id" text
);


alter table "public"."subscriptions" enable row level security;

create table "public"."users" (
    "id" uuid not null,
    "type" text,
    "stripe_customer_id" text
);


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX creators_pkey ON public.creators USING btree (user_id);

CREATE UNIQUE INDEX creators_user_id_key ON public.creators USING btree (user_id);

CREATE UNIQUE INDEX sellers_pkey ON public.sellers USING btree (user_id);

CREATE UNIQUE INDEX sellers_seller_name_key ON public.sellers USING btree (seller_name);

CREATE UNIQUE INDEX sellers_user_id_key ON public.sellers USING btree (user_id);

CREATE UNIQUE INDEX subscriptions_pkey ON public.subscriptions USING btree (user_id);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."creators" add constraint "creators_pkey" PRIMARY KEY using index "creators_pkey";

alter table "public"."sellers" add constraint "sellers_pkey" PRIMARY KEY using index "sellers_pkey";

alter table "public"."subscriptions" add constraint "subscriptions_pkey" PRIMARY KEY using index "subscriptions_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."creators" add constraint "creators_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."creators" validate constraint "creators_user_id_fkey";

alter table "public"."creators" add constraint "creators_user_id_key" UNIQUE using index "creators_user_id_key";

alter table "public"."sellers" add constraint "sellers_seller_name_key" UNIQUE using index "sellers_seller_name_key";

alter table "public"."sellers" add constraint "sellers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."sellers" validate constraint "sellers_user_id_fkey";

alter table "public"."sellers" add constraint "sellers_user_id_key" UNIQUE using index "sellers_user_id_key";

alter table "public"."subscriptions" add constraint "subscriptions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."subscriptions" validate constraint "subscriptions_user_id_fkey";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."users" validate constraint "users_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.users (id, type)
  values (new.id, new.raw_user_meta_data->>'type');
  return new;
end;$function$
;

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

grant delete on table "public"."sellers" to "anon";

grant insert on table "public"."sellers" to "anon";

grant references on table "public"."sellers" to "anon";

grant select on table "public"."sellers" to "anon";

grant trigger on table "public"."sellers" to "anon";

grant truncate on table "public"."sellers" to "anon";

grant update on table "public"."sellers" to "anon";

grant delete on table "public"."sellers" to "authenticated";

grant insert on table "public"."sellers" to "authenticated";

grant references on table "public"."sellers" to "authenticated";

grant select on table "public"."sellers" to "authenticated";

grant trigger on table "public"."sellers" to "authenticated";

grant truncate on table "public"."sellers" to "authenticated";

grant update on table "public"."sellers" to "authenticated";

grant delete on table "public"."sellers" to "service_role";

grant insert on table "public"."sellers" to "service_role";

grant references on table "public"."sellers" to "service_role";

grant select on table "public"."sellers" to "service_role";

grant trigger on table "public"."sellers" to "service_role";

grant truncate on table "public"."sellers" to "service_role";

grant update on table "public"."sellers" to "service_role";

grant delete on table "public"."subscriptions" to "anon";

grant insert on table "public"."subscriptions" to "anon";

grant references on table "public"."subscriptions" to "anon";

grant select on table "public"."subscriptions" to "anon";

grant trigger on table "public"."subscriptions" to "anon";

grant truncate on table "public"."subscriptions" to "anon";

grant update on table "public"."subscriptions" to "anon";

grant delete on table "public"."subscriptions" to "authenticated";

grant insert on table "public"."subscriptions" to "authenticated";

grant references on table "public"."subscriptions" to "authenticated";

grant select on table "public"."subscriptions" to "authenticated";

grant trigger on table "public"."subscriptions" to "authenticated";

grant truncate on table "public"."subscriptions" to "authenticated";

grant update on table "public"."subscriptions" to "authenticated";

grant delete on table "public"."subscriptions" to "service_role";

grant insert on table "public"."subscriptions" to "service_role";

grant references on table "public"."subscriptions" to "service_role";

grant select on table "public"."subscriptions" to "service_role";

grant trigger on table "public"."subscriptions" to "service_role";

grant truncate on table "public"."subscriptions" to "service_role";

grant update on table "public"."subscriptions" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

create policy "Enable insert for users based on user_id"
on "public"."sellers"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = user_id));


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


create policy "Enable insert for users based on user_id"
on "public"."subscriptions"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable users to view their own data only"
on "public"."subscriptions"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Can update own user data."
on "public"."users"
as permissive
for update
to public
using ((auth.uid() = id));


create policy "Can view own user data."
on "public"."users"
as permissive
for select
to public
using ((auth.uid() = id));


CREATE TRIGGER handle_new_user AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

