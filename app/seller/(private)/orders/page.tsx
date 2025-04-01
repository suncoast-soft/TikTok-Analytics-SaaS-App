import Card from '@/components/modules/Card';
import DatePickerWithRange from '@/components/modules/DateRange';
import Title from '@/components/modules/Title';
import OrderTable from '@/components/sections/OrderTable';
import { Tables } from '@/types/db';
import { getAllSellerOrders } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { format, subDays } from 'date-fns';

type Campaign = Tables<'campaigns'>;
type Order = Tables<'orders'> & {
  campaigns: Campaign;
};

export default async function SellerOrders({
  searchParams
}: {
  searchParams: Promise<{
    start_date: string;
    end_date: string;
  }>;
}) {
  const { start_date, end_date } = await searchParams;

  const start_date_ge =
    start_date ?? format(subDays(new Date(), 30), 'yyyy-MM-dd');
  const end_date_lt = end_date ?? format(new Date(), 'yyyy-MM-dd');

  const supabase = await createClient();
  const orders = ((await getAllSellerOrders(supabase)) ?? []) as Order[];

  return (
    <div className="container max-w-7xl py-12">
      <Card className="p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center">
          <Title title="Affiliate Orders" tag="h2" />

          <DatePickerWithRange
            date={{ from: new Date(start_date_ge), to: new Date(end_date_lt) }}
          />
        </div>

        <OrderTable orders={[...orders.filter((order) => order.campaign_id)]} />
      </Card>
    </div>
  );
}
