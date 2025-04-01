import Card from '@/components/modules/Card';
import Title from '@/components/modules/Title';
import OrderTable from '@/components/sections/OrderTable';
import { Tables } from '@/types/db';
import { getAllCreatorOrders, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

type User = Tables<'users'>;
type Campaign = Tables<'campaigns'>;
type Order = Tables<'orders'> & {
  campaigns: Campaign;
};

export default async function OrderAnalytics() {
  const supabase = await createClient();
  const user = (await getUser(supabase)) as User;
  const orders = ((await getAllCreatorOrders(
    supabase,
    user.creator_username
  )) ?? []) as Order[];

  return (
    <div className="container max-w-6xl py-12">
      <Card className="p-4 lg:p-8">
        <Title title="Affiliate Orders" tag="h2" />
        <OrderTable orders={orders} />
      </Card>
    </div>
  );
}
