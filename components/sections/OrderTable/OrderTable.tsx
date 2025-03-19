import { requestTikTokShopAPIClient } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Order } from '@/types/tiktok';
import { displayDate } from '@/utils/helpers';
import Link from 'next/link';

interface SectionProps {
  orders: Order[];
}

const fetchCampaign = async (campaign_id: string) => {
  const data = await requestTikTokShopAPIClient(
    `/affiliate_seller/202412/target_collaborations/${campaign_id}`,
    {},
    'GET',
    ''
  );

  return data?.data?.target_collaboration ?? {};
};

export default function OrderTable({ orders }: SectionProps) {
  const CampaignBody = async ({ campaignId }: { campaignId: string }) => {
    const campaign = await fetchCampaign(campaignId);

    return (
      <div>
        <h5 className="font-bold text-lg mb-1">{campaign.name}</h5>
        <Button asChild>
          <Link href={`/seller/campaigns/${campaignId}`}>View Campaign</Link>
        </Button>
      </div>
    );
  };
  return (
    <Table className="border-none mb-12">
      <TableHeader className="bg-navy-700">
        <TableRow className="border-navy-950 shadow-lg">
          <TableHead className="min-w-24">Order ID</TableHead>
          <TableHead className="min-w-60">Ordered Date</TableHead>
          <TableHead className="min-w-36">Campaign</TableHead>
          <TableHead className="min-w-36">Creator</TableHead>
          <TableHead className="min-w-36">Price</TableHead>
          <TableHead className="min-w-36">Commission</TableHead>
          <TableHead className="min-w-24">Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-navy-800">
        {orders.map((order) => (
          <TableRow key={order.id} className="border-navy-300">
            <TableCell>{order.id}</TableCell>
            <TableCell>{displayDate(order.create_time * 1000)}</TableCell>
            <TableCell>
              <CampaignBody
                campaignId={order.skus[0].target_collaboration_id}
              />
            </TableCell>
            <TableCell>{`@${order.skus[0].creator_username} (${order.skus[0].content_type})`}</TableCell>
            <TableCell>{`$${order.skus[0].price.amount}`}</TableCell>
            <TableCell>{`$${order.skus[0].estimated_paid_commission.amount}`}</TableCell>
            <TableCell>{order.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
