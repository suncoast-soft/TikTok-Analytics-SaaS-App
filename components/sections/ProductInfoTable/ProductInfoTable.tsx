import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Image from 'next/image';

interface SectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any[];
}

export default function ProductInfoTable({ products }: SectionProps) {
  return (
    <Table className="border-none mb-12">
      <TableHeader className="bg-navy-700">
        <TableRow className="border-navy-950 shadow-lg">
          <TableHead className="min-w-60">Image</TableHead>
          <TableHead className="min-w-60">Name</TableHead>
          <TableHead className="min-w-24">Retail Price</TableHead>
          <TableHead className="min-w-36">Commission rate</TableHead>
          <TableHead className="min-w-24">Stock</TableHead>
          <TableHead className="min-w-40">Variants</TableHead>
          <TableHead className="min-w-40 text-right">Sample Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-navy-800">
        {products.map((product) => (
          <TableRow key={product.id} className="border-navy-300">
            <TableCell className="font-medium">
              <div className="flex gap-2">
                {product.images.map((image: string) => (
                  <Image
                    key={image}
                    src={image}
                    width={60}
                    height={60}
                    alt={image}
                  />
                ))}
              </div>
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.commission_rate}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>
              {product.variant.name}: {product.variant.options.join(', ')}
            </TableCell>
            <TableCell className="text-right">
              {product.sample_status ? 'Auto Approve' : 'Manual'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
