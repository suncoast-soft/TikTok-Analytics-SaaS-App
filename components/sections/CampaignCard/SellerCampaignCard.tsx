import Badge from '@/components/modules/Badge';
import Box from '@/components/modules/Box';
import Card from '@/components/modules/Card';
import ProgressBar from '@/components/modules/ProgressBar';
import Title from '@/components/modules/Title';
import { Button } from '@/components/ui/button';
import { SellerCampaignDetail } from '@/types/tiktok';
import { getTimeDiff } from '@/utils/helpers';
import {
  CircleDollarSignIcon,
  ShoppingBagIcon,
  TimerIcon,
  VideoIcon
} from 'lucide-react';
import Link from 'next/link';
import { Tables } from '@/types/db';
import Brand from '@/components/modules/Brand';
import Image from 'next/image';

type User = Tables<'users'>;
type Campaign = Tables<'campaigns'>;

export function SellerCampaignCard({
  campaign,
  seller
}: {
  campaign: Campaign;
  seller: User;
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
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative w-full lg:w-1/4 max-w-60 h-60 flex-shrink-0">
          {productThumbnail && (
            <Image
              src={productThumbnail}
              width={1000}
              height={1000}
              alt={name || 'Product Thumbnail'}
              className="w-full h-full object-cover rounded-xl"
            />
          )}
        </div>

        <div className="relative w-full lg:w-1/2 px-3 lg:px-8 py-4">
          <Brand tag="h4" brand={seller.seller_name!} />
          <Title tag="h3" title={name!} className="mb-4" />

          <Box
            icon={<TimerIcon width={16} />}
            label="Campaign progress"
            className="w-full lg:w-96 mb-5"
          >
            <ProgressBar
              progress={getTimeDiff(start_time!, end_time!).progress}
              label={getTimeDiff(start_time!, end_time!).text}
            />
          </Box>

          <Badge
            button={
              <Button size="sm" asChild>
                <Link href={`/seller/campaigns/${campaign_id}`}>
                  Manage Reward Milestones
                </Link>
              </Button>
            }
          />
        </div>

        <div className="w-full lg:w-1/4 px-3">
          <Badge
            icon={<ShoppingBagIcon />}
            value={`${product_count}`}
            label="Products"
            size="lg"
            className="w-full py-4 mb-3"
          />

          <Badge
            icon={<CircleDollarSignIcon />}
            value={`${creator_invited_count}`}
            label="Creator Invites"
            size="lg"
            className="w-full py-4 mb-3"
          />

          <Badge
            icon={<VideoIcon />}
            value={`${showcase_creator_count}`}
            label="Creators"
            size="lg"
            className="w-full py-4"
          />
        </div>
      </div>
    </Card>
  );
}
