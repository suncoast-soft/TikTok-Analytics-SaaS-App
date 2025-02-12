alter table "public"."subscriptions" drop constraint "subscriptions_pkey";

drop index if exists "public"."subscriptions_pkey";

alter table "public"."subscriptions" drop column "id";

alter table "public"."subscriptions" drop column "price_id";

alter table "public"."subscriptions" add column "subscription_id" text;

alter table "public"."subscriptions" alter column "user_id" set not null;

CREATE UNIQUE INDEX subscriptions_pkey ON public.subscriptions USING btree (user_id);

alter table "public"."subscriptions" add constraint "subscriptions_pkey" PRIMARY KEY using index "subscriptions_pkey";



