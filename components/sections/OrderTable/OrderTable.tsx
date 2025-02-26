import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Order } from '@/types/tiktok';
import { format } from 'date-fns';

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
          <TableHead className="min-w-60">Shipped Date</TableHead>
          <TableHead className="min-w-36">Ordered Products</TableHead>
          <TableHead className="min-w-24">Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-navy-800">
        {orders.map((order) => (
          <TableRow key={order.id} className="border-navy-300">
            <TableCell>{order.id}</TableCell>
            <TableCell>
              {format(new Date(order.create_time * 1000), 'PPP')}
            </TableCell>
            <TableCell>
              {format(new Date(order.delivery_time * 1000), 'PPP')}
            </TableCell>
            <TableCell>
              {order.skus.map((sku) => sku.product_id).join(', ')}
            </TableCell>
            <TableCell>{order.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
