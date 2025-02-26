import Card from '@/components/modules/Card';
import Title from '@/components/modules/Title';
import OrderTable from '@/components/sections/OrderTable';
import { seller_orders } from '@/utils/mock';

export default async function SellerOrders() {
  return (
    <div className="container max-w-7xl py-12">
      <Card vertical={true} className="p-4 lg:p-8">
        <Title title="Affiliate Orders" tag="h2" />
        <OrderTable orders={seller_orders} />
      </Card>
    </div>
  );
}
