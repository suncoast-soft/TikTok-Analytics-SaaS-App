import TableHeadSort from '@/components/modules/TableHead';
import VideoThumbnail from '@/components/modules/VideoThumbnail';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Tables } from '@/types/db';
import { displayMoney, displayNumber } from '@/utils/helpers';

type Video = Tables<'videos'>;

interface SectionProps {
  videos: Video[];
}

export default function VideoTable({ videos }: SectionProps) {
  return (
    <>
      <Table className="border-none mb-12">
        <TableHeader className="bg-navy-700">
          <TableRow className="border-navy-950 shadow-lg">
            <TableHeadSort className="min-w-20">Video</TableHeadSort>
            <TableHeadSort className="min-w-20">Creator</TableHeadSort>
            <TableHeadSort className="min-w-24" sortField="views">
              Views
            </TableHeadSort>
            <TableHeadSort className="min-w-32" sortField="gmv">
              GMV
            </TableHeadSort>
            <TableHeadSort className="min-w-24" sortField="click_through_rate">
              Click Rate
            </TableHeadSort>
            <TableHeadSort className="min-w-24" sortField="sku_orders">
              Orders
            </TableHeadSort>
            <TableHeadSort className="min-w-24" sortField="units_sold">
              Units Sold
            </TableHeadSort>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-navy-800">
          {videos.map((video) => (
            <TableRow key={video.video_id} className="border-navy-300">
              <TableCell>
                <VideoThumbnail videoId={video.video_id!} />
              </TableCell>
              <TableCell>@{video.creator_username}</TableCell>
              <TableCell>{displayNumber(video.views)}</TableCell>
              <TableCell>{displayMoney(video.gmv)}</TableCell>
              <TableCell>
                {displayNumber(Number(video.click_through_rate) * 100)}%
              </TableCell>
              <TableCell>{displayNumber(video.sku_orders)}</TableCell>
              <TableCell>{displayNumber(video.units_sold)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
