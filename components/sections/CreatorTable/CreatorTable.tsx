import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Creator } from '@/types/tiktok';
import Image from 'next/image';

interface SectionProps {
  creators: Creator[];
}

export default function CreatorTable({ creators }: SectionProps) {
  return (
    <Table className="border-none mb-12">
      <TableHeader className="bg-navy-700">
        <TableRow className="border-navy-950 shadow-lg">
          <TableHead className="min-w-24">Image</TableHead>
          <TableHead className="min-w-60">Name</TableHead>
          <TableHead className="min-w-60">GMV</TableHead>
          <TableHead className="min-w-36">Followers</TableHead>
          <TableHead className="min-w-24">Categories</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-navy-800">
        {creators.map((creator) => (
          <TableRow key={creator.username} className="border-navy-300">
            <TableCell className="font-medium">
              <Image
                src={creator.avatar.url}
                width={128}
                height={128}
                alt={creator.username}
                className="rounded-full max-w-16"
              />
            </TableCell>
            <TableCell>{`${creator.nickname} @(${creator.username})`}</TableCell>
            <TableCell>
              {Number(creator.gmv.amount).toLocaleString()}{' '}
              {creator.gmv.currency}
            </TableCell>
            <TableCell>
              {Number(creator.follower_count).toLocaleString()}
            </TableCell>
            <TableCell>{creator.category_ids.join(', ')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
