import Badge from '@/components/modules/Badge';
import Box from '@/components/modules/Box';
import Card from '@/components/modules/Card';
import ProgressBar from '@/components/modules/ProgressBar';
import Title from '@/components/modules/Title';
import { Button } from '@/components/ui/button';
import { Tables } from '@/types/db';
import { SellerCampaignDetail } from '@/types/tiktok';
import { getTimeDiff } from '@/utils/helpers';
import {
  CircleDollarSignIcon,
  ShoppingBagIcon,
  TimerIcon,
  TimerResetIcon,
  VideoIcon
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Campaign = Tables<'campaigns'>;

export function ActiveLargeCampaignCard({
  campaign,
  isSeller = false
}: {
  campaign: Campaign;
  isSeller?: boolean;
}) {
  const { campaign_id, name, start_time, end_time, details } = campaign;
  const {
    products,
    product_count,
    creator_invited_count,
    showcase_creator_count
  } = details as unknown as SellerCampaignDetail;
  const productThumbnail = products?.[0]?.main_image_url;

  return (
    <Card>
      <div className="relative w-full lg:w-1/3 h-72 flex-shrink-0">
        {productThumbnail && (
          <Image
            src={productThumbnail}
            width={1000}
            height={1000}
            alt={name || 'Product Thumbnail'}
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute left-4 top-4">
          <Badge
            icon={<TimerResetIcon width={16} />}
            value={getTimeDiff(start_time!, end_time!).text}
          />
        </div>
      </div>

      <div className="w-full lg:w-5/12 px-3 lg:px-8 py-4">
        <Title tag="h3" title={name!} subtitle={'Locked'} />

        <Box
          icon={<TimerIcon width={16} />}
          label="Campaign progress"
          className="w-full lg:w-96 mb-4"
        >
          <ProgressBar
            progress={getTimeDiff(start_time!, end_time!).progress}
            label={getTimeDiff(start_time!, end_time!).text}
          />
        </Box>

        <Badge
          button={
            <Button size="sm" asChild>
              <Link
                href={`/${isSeller ? 'seller' : 'creator'}/campaigns/${campaign_id}`}
              >
                View Details
              </Link>
            </Button>
          }
        />
      </div>

      <div className="w-full lg:w-1/4 px-3 lg:px-8 py-4">
        <Badge
          icon={<ShoppingBagIcon size={16} />}
          value={`${product_count}`}
          label="Products"
          size="lg"
          className="w-full py-3 mb-3"
        />

        <Badge
          icon={<CircleDollarSignIcon size={16} />}
          value={`${creator_invited_count}`}
          label="Invited Creators"
          size="lg"
          className="w-full py-3 mb-3"
        />

        <Badge
          icon={<VideoIcon size={16} />}
          value={`${showcase_creator_count}`}
          label="Showcase Creators"
          size="lg"
          className="w-full py-3"
        />
      </div>
    </Card>
  );
}
