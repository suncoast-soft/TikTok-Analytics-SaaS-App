drop policy "Enable delete for users based on user_id" on "public"."creators";

drop policy "Enable insert for users based on user_id" on "public"."creators";

drop policy "Enable update for users based on user_id" on "public"."creators";

drop policy "Enable users to view their own data only" on "public"."creators";

drop policy "Enable insert for users based on user_id" on "public"."sellers";

drop policy "Enable read access for all users" on "public"."sellers";

drop policy "Enable update access for all users" on "public"."sellers";

revoke delete on table "public"."creators" from "anon";

revoke insert on table "public"."creators" from "anon";

revoke references on table "public"."creators" from "anon";

revoke select on table "public"."creators" from "anon";

revoke trigger on table "public"."creators" from "anon";

revoke truncate on table "public"."creators" from "anon";

revoke update on table "public"."creators" from "anon";

revoke delete on table "public"."creators" from "authenticated";

revoke insert on table "public"."creators" from "authenticated";

revoke references on table "public"."creators" from "authenticated";

revoke select on table "public"."creators" from "authenticated";

revoke trigger on table "public"."creators" from "authenticated";

revoke truncate on table "public"."creators" from "authenticated";

revoke update on table "public"."creators" from "authenticated";

revoke delete on table "public"."creators" from "service_role";

revoke insert on table "public"."creators" from "service_role";

revoke references on table "public"."creators" from "service_role";

revoke select on table "public"."creators" from "service_role";

revoke trigger on table "public"."creators" from "service_role";

revoke truncate on table "public"."creators" from "service_role";

revoke update on table "public"."creators" from "service_role";

revoke delete on table "public"."sellers" from "anon";

revoke insert on table "public"."sellers" from "anon";

revoke references on table "public"."sellers" from "anon";

revoke select on table "public"."sellers" from "anon";

revoke trigger on table "public"."sellers" from "anon";

revoke truncate on table "public"."sellers" from "anon";

revoke update on table "public"."sellers" from "anon";

revoke delete on table "public"."sellers" from "authenticated";

revoke insert on table "public"."sellers" from "authenticated";

revoke references on table "public"."sellers" from "authenticated";

revoke select on table "public"."sellers" from "authenticated";

revoke trigger on table "public"."sellers" from "authenticated";

revoke truncate on table "public"."sellers" from "authenticated";

revoke update on table "public"."sellers" from "authenticated";

revoke delete on table "public"."sellers" from "service_role";

revoke insert on table "public"."sellers" from "service_role";

revoke references on table "public"."sellers" from "service_role";

revoke select on table "public"."sellers" from "service_role";

revoke trigger on table "public"."sellers" from "service_role";

revoke truncate on table "public"."sellers" from "service_role";

revoke update on table "public"."sellers" from "service_role";

alter table "public"."creators" drop constraint "creators_user_id_fkey";

alter table "public"."creators" drop constraint "creators_user_id_key";

alter table "public"."sellers" drop constraint "sellers_seller_name_key";

alter table "public"."sellers" drop constraint "sellers_user_id_fkey";

alter table "public"."sellers" drop constraint "sellers_user_id_key";

alter table "public"."campaigns" drop constraint "campaigns_seller_fkey";

alter table "public"."creators" drop constraint "creators_pkey";

alter table "public"."sellers" drop constraint "sellers_pkey";

drop index if exists "public"."creators_pkey";

drop index if exists "public"."creators_user_id_key";

drop index if exists "public"."sellers_pkey";

drop index if exists "public"."sellers_seller_name_key";

drop index if exists "public"."sellers_user_id_key";

drop table "public"."creators";

drop table "public"."sellers";

alter table "public"."users" add column "access_token" text;

alter table "public"."users" add column "access_token_expire_at" numeric;

alter table "public"."users" add column "refresh_token" text;

alter table "public"."users" add column "refresh_token_expire_at" numeric;

alter table "public"."users" add column "seller_id" text;

alter table "public"."users" add column "seller_name" text;

alter table "public"."users" add column "shop_cipher" text;

alter table "public"."users" alter column "type" set data type user_type using "type"::user_type;

CREATE UNIQUE INDEX users_seller_id_key ON public.users USING btree (seller_id);

alter table "public"."users" add constraint "users_seller_id_key" UNIQUE using index "users_seller_id_key";

alter table "public"."campaigns" add constraint "campaigns_seller_fkey" FOREIGN KEY (seller) REFERENCES users(seller_id) not valid;

alter table "public"."campaigns" validate constraint "campaigns_seller_fkey";



