create type "public"."user_type" as enum ('creator', 'seller');

drop policy "Allow public read-only access." on "public"."prices";

drop policy "Allow public read-only access." on "public"."products";

drop policy "Can only view own subs data." on "public"."subscriptions";

revoke delete on table "public"."customers" from "anon";

revoke insert on table "public"."customers" from "anon";

revoke references on table "public"."customers" from "anon";

revoke select on table "public"."customers" from "anon";

revoke trigger on table "public"."customers" from "anon";

revoke truncate on table "public"."customers" from "anon";

revoke update on table "public"."customers" from "anon";

revoke delete on table "public"."customers" from "authenticated";

revoke insert on table "public"."customers" from "authenticated";

revoke references on table "public"."customers" from "authenticated";

revoke select on table "public"."customers" from "authenticated";

revoke trigger on table "public"."customers" from "authenticated";

revoke truncate on table "public"."customers" from "authenticated";

revoke update on table "public"."customers" from "authenticated";

revoke delete on table "public"."customers" from "service_role";

revoke insert on table "public"."customers" from "service_role";

revoke references on table "public"."customers" from "service_role";

revoke select on table "public"."customers" from "service_role";

revoke trigger on table "public"."customers" from "service_role";

revoke truncate on table "public"."customers" from "service_role";

revoke update on table "public"."customers" from "service_role";

revoke delete on table "public"."prices" from "anon";

revoke insert on table "public"."prices" from "anon";

revoke references on table "public"."prices" from "anon";

revoke select on table "public"."prices" from "anon";

revoke trigger on table "public"."prices" from "anon";

revoke truncate on table "public"."prices" from "anon";

revoke update on table "public"."prices" from "anon";

revoke delete on table "public"."prices" from "authenticated";

revoke insert on table "public"."prices" from "authenticated";

revoke references on table "public"."prices" from "authenticated";

revoke select on table "public"."prices" from "authenticated";

revoke trigger on table "public"."prices" from "authenticated";

revoke truncate on table "public"."prices" from "authenticated";

revoke update on table "public"."prices" from "authenticated";

revoke delete on table "public"."prices" from "service_role";

revoke insert on table "public"."prices" from "service_role";

revoke references on table "public"."prices" from "service_role";

revoke select on table "public"."prices" from "service_role";

revoke trigger on table "public"."prices" from "service_role";

revoke truncate on table "public"."prices" from "service_role";

revoke update on table "public"."prices" from "service_role";

revoke delete on table "public"."products" from "anon";

revoke insert on table "public"."products" from "anon";

revoke references on table "public"."products" from "anon";

revoke select on table "public"."products" from "anon";

revoke trigger on table "public"."products" from "anon";

revoke truncate on table "public"."products" from "anon";

revoke update on table "public"."products" from "anon";

revoke delete on table "public"."products" from "authenticated";

revoke insert on table "public"."products" from "authenticated";

revoke references on table "public"."products" from "authenticated";

revoke select on table "public"."products" from "authenticated";

revoke trigger on table "public"."products" from "authenticated";

revoke truncate on table "public"."products" from "authenticated";

revoke update on table "public"."products" from "authenticated";

revoke delete on table "public"."products" from "service_role";

revoke insert on table "public"."products" from "service_role";

revoke references on table "public"."products" from "service_role";

revoke select on table "public"."products" from "service_role";

revoke trigger on table "public"."products" from "service_role";

revoke truncate on table "public"."products" from "service_role";

revoke update on table "public"."products" from "service_role";

alter table "public"."customers" drop constraint "customers_id_fkey";

alter table "public"."prices" drop constraint "prices_currency_check";

alter table "public"."prices" drop constraint "prices_product_id_fkey";

alter table "public"."subscriptions" drop constraint "subscriptions_price_id_fkey";

alter table "public"."subscriptions" drop constraint "subscriptions_user_id_fkey";

alter table "public"."customers" drop constraint "customers_pkey";

alter table "public"."prices" drop constraint "prices_pkey";

alter table "public"."products" drop constraint "products_pkey";

alter table "public"."subscriptions" drop constraint "subscriptions_pkey";

drop index if exists "public"."customers_pkey";

drop index if exists "public"."prices_pkey";

drop index if exists "public"."products_pkey";

drop index if exists "public"."subscriptions_pkey";

drop table "public"."customers";

drop table "public"."prices";

drop table "public"."products";

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

alter table "public"."subscriptions" drop column "cancel_at";

alter table "public"."subscriptions" drop column "cancel_at_period_end";

alter table "public"."subscriptions" drop column "canceled_at";

alter table "public"."subscriptions" drop column "created";

alter table "public"."subscriptions" drop column "current_period_end";

alter table "public"."subscriptions" drop column "current_period_start";

alter table "public"."subscriptions" drop column "ended_at";

alter table "public"."subscriptions" drop column "id";

alter table "public"."subscriptions" drop column "metadata";

alter table "public"."subscriptions" drop column "price_id";

alter table "public"."subscriptions" drop column "quantity";

alter table "public"."subscriptions" drop column "status";

alter table "public"."subscriptions" drop column "trial_end";

alter table "public"."subscriptions" drop column "trial_start";

alter table "public"."subscriptions" add column "created_at" timestamp with time zone not null default now();

alter table "public"."subscriptions" add column "subscription_id" text;

alter table "public"."users" drop column "avatar_url";

alter table "public"."users" drop column "billing_address";

alter table "public"."users" drop column "full_name";

alter table "public"."users" drop column "payment_method";

alter table "public"."users" add column "stripe_customer_id" text;

alter table "public"."users" add column "type" text;

drop type "public"."pricing_plan_interval";

drop type "public"."pricing_type";

drop type "public"."subscription_status";

CREATE UNIQUE INDEX creators_pkey ON public.creators USING btree (user_id);

CREATE UNIQUE INDEX creators_user_id_key ON public.creators USING btree (user_id);

CREATE UNIQUE INDEX sellers_pkey ON public.sellers USING btree (user_id);

CREATE UNIQUE INDEX sellers_seller_name_key ON public.sellers USING btree (seller_name);

CREATE UNIQUE INDEX sellers_user_id_key ON public.sellers USING btree (user_id);

CREATE UNIQUE INDEX subscriptions_pkey ON public.subscriptions USING btree (user_id);

alter table "public"."creators" add constraint "creators_pkey" PRIMARY KEY using index "creators_pkey";

alter table "public"."sellers" add constraint "sellers_pkey" PRIMARY KEY using index "sellers_pkey";

alter table "public"."subscriptions" add constraint "subscriptions_pkey" PRIMARY KEY using index "subscriptions_pkey";

alter table "public"."creators" add constraint "creators_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."creators" validate constraint "creators_user_id_fkey";

alter table "public"."creators" add constraint "creators_user_id_key" UNIQUE using index "creators_user_id_key";

alter table "public"."sellers" add constraint "sellers_seller_name_key" UNIQUE using index "sellers_seller_name_key";

alter table "public"."sellers" add constraint "sellers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."sellers" validate constraint "sellers_user_id_fkey";

alter table "public"."sellers" add constraint "sellers_user_id_key" UNIQUE using index "sellers_user_id_key";

alter table "public"."subscriptions" add constraint "subscriptions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."subscriptions" validate constraint "subscriptions_user_id_fkey";

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




