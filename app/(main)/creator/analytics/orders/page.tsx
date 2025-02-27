import { requestTikTokShopAPIClient } from '@/app/actions';
import Card from '@/components/modules/Card';
import Title from '@/components/modules/Title';
import OrderTable from '@/components/sections/OrderTable';

export default async function OrderAnalytics() {
  const sellerAffiliateOrdersData = await requestTikTokShopAPIClient(
    '/affiliate_seller/202410/orders/search',
    {
      page_size: 20
    },
    'POST',
    ''
  );
  const { orders } = sellerAffiliateOrdersData.data;

  return (
    <div className="container max-w-7xl py-12">
      <Card vertical={true} className="p-4 lg:p-8">
        <Title title="Affiliate Orders" tag="h2" />
        <OrderTable orders={[...orders]} />
      </Card>
    </div>
  );
}
