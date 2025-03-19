alter table "public"."campaigns" drop constraint "rewards_seller_fkey";

alter table "public"."campaigns" drop column "seller";

alter table "public"."campaigns" add column "campaign_id" text;

CREATE UNIQUE INDEX campaigns_campaign_id_key ON public.campaigns USING btree (campaign_id);

alter table "public"."campaigns" add constraint "campaigns_campaign_id_key" UNIQUE using index "campaigns_campaign_id_key";



