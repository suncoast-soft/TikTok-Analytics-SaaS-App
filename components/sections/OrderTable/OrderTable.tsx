import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Tables } from '@/types/db';
import { displayDate } from '@/utils/helpers';
import Link from 'next/link';

type Campaign = Tables<'campaigns'>;
type Order = Tables<'orders'> & {
  campaigns: Campaign;
};

interface SectionProps {
  orders: Order[];
}

export default function OrderTable({ orders }: SectionProps) {
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
            <TableCell>{displayDate(order.create_time! * 1000)}</TableCell>
            <TableCell>
              <div className="py-2">
                <h5 className="font-semibold text-lg mb-1">
                  {order.campaigns.name}
                </h5>
                <Button asChild>
                  <Link href={`/seller/campaigns/${order.campaign_id}`}>
                    View Campaign
                  </Link>
                </Button>
              </div>
            </TableCell>
            <TableCell>{`@${order.creator_username}`}</TableCell>
            <TableCell>{`$${order.commission_base}`}</TableCell>
            <TableCell>{`$${order.paid_commission}`}</TableCell>
            <TableCell>{order.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
