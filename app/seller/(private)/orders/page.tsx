/* eslint-disable @typescript-eslint/no-explicit-any */
import { requestTikTokShopAPIClient } from '@/app/actions';
import Card from '@/components/modules/Card';
import DatePickerWithRange from '@/components/modules/DateRange';
import Title from '@/components/modules/Title';
import OrderTable from '@/components/sections/OrderTable';
import { format, subDays } from 'date-fns';

interface APIParams {
  [key: string]: string | number;
}

const fetchAffiliateOrders = async (params: APIParams, body: string) => {
  const data = await requestTikTokShopAPIClient(
    '/affiliate_seller/202410/orders/search',
    params,
    'POST',
    body
  );

  return data?.data?.orders ?? [];
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
    start_date ?? format(subDays(new Date(), 7), 'yyyy-MM-dd');
  const end_date_lt = end_date ?? format(new Date(), 'yyyy-MM-dd');

  const orders = await fetchAffiliateOrders(
    {
      page_size: 100
    },
    JSON.stringify({
      start_date_ge,
      end_date_lt
    })
  );

  return (
    <div className="container max-w-7xl py-12">
      <Card vertical={true} className="p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center">
          <Title title="Affiliate Orders" tag="h2" />

          <DatePickerWithRange
            date={{ from: new Date(start_date_ge), to: new Date(end_date_lt) }}
          />
        </div>

        <OrderTable
          orders={[
            ...orders.filter(
              (order: any) => order.skus[0].target_collaboration_id
            )
          ]}
        />
      </Card>
    </div>
  );
}
