CREATE UNIQUE INDEX orders_order_id_key ON public.orders USING btree (order_id);

alter table "public"."orders" add constraint "orders_order_id_key" UNIQUE using index "orders_order_id_key";



