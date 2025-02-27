import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Image from 'next/image';
import { Product } from '@/types/tiktok';

interface SectionProps {
  products: Product[];
}

export default function ProductInfoTable({ products }: SectionProps) {
  return (
    <Table className="border-none mb-12">
      <TableHeader className="bg-navy-700">
        <TableRow className="border-navy-950 shadow-lg">
          <TableHead className="min-w-24">Image</TableHead>
          <TableHead className="min-w-60">Name</TableHead>
          <TableHead className="min-w-24">Retail Price</TableHead>
          <TableHead className="min-w-36">Commission rate</TableHead>
          <TableHead className="min-w-24">Status</TableHead>
          <TableHead className="min-w-48">Collaboration Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-navy-800">
        {products.map((product) => (
          <TableRow key={product.id} className="border-navy-300">
            <TableCell className="font-medium">
              <Image
                src={product.main_image_url}
                width={80}
                height={80}
                alt={product.title}
              />
            </TableCell>
            <TableCell>{product.title}</TableCell>
            <TableCell>
              ${product.original_price.minimum_amount}{' '}
              {product.original_price.currency}
            </TableCell>
            <TableCell>{product.commission.rate / 100}%</TableCell>
            <TableCell>{product.status}</TableCell>
            <TableCell>{product.collaboration_status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
