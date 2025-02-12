alter table "public"."sellers" drop constraint "sellers_pkey";

drop index if exists "public"."sellers_pkey";

alter table "public"."sellers" drop column "id";

alter table "public"."sellers" alter column "user_id" set not null;

CREATE UNIQUE INDEX sellers_user_id_key ON public.sellers USING btree (user_id);

CREATE UNIQUE INDEX sellers_pkey ON public.sellers USING btree (user_id);

alter table "public"."sellers" add constraint "sellers_pkey" PRIMARY KEY using index "sellers_pkey";

alter table "public"."sellers" add constraint "sellers_user_id_key" UNIQUE using index "sellers_user_id_key";



