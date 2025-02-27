'use client';

import DatePickerWithRange from '@/components/modules/DateRange';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Video } from '@/types/tiktok';
import { subDays } from 'date-fns';
import { ExternalLinkIcon, VideoIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

interface SectionProps {
  videos: Video[];
}

export default function VideoTable({ videos }: SectionProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 8),
    to: subDays(new Date(), 1)
  });

  return (
    <>
      <DatePickerWithRange date={date} setDate={setDate} />

      <Table className="border-none mb-12">
        <TableHeader className="bg-navy-700">
          <TableRow className="border-navy-950 shadow-lg">
            <TableHead className="min-w-56">Video</TableHead>
            <TableHead className="min-w-20">Creator</TableHead>
            <TableHead className="min-w-16">Views</TableHead>
            <TableHead className="min-w-24">GMV</TableHead>
            <TableHead className="min-w-16">Orders</TableHead>
            <TableHead className="min-w-16">Units Sold</TableHead>
            <TableHead className="min-w-32">Products</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-navy-800">
          {videos.map((video) => (
            <TableRow key={video.id} className="border-navy-300">
              <TableCell>
                <Link
                  href={`https://www.tiktok.com/@${video.username}/video/${video.id}`}
                  target="_blank"
                  className="flex gap-3"
                >
                  <VideoIcon size={32} />
                  <span className="max-w-48">
                    {video.title || 'Video Removed'}
                  </span>
                  <ExternalLinkIcon size={15} />
                </Link>
              </TableCell>
              <TableCell>@{video.username}</TableCell>
              <TableCell>{video.views}</TableCell>
              <TableCell>
                {Number(video.gmv.amount).toLocaleString()} {video.gmv.currency}
              </TableCell>
              <TableCell>{video.sku_orders}</TableCell>
              <TableCell>{video.units_sold}</TableCell>
              <TableCell>
                {video.products.map((product) => product.name).join(', ')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
