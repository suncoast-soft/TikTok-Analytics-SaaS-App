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
  TimerResetIcon,
  VideoIcon
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function ActiveLargeCampaignCard({
  campaign,
  isSeller = false
}: {
  campaign: SellerCampaignDetail;
  isSeller?: boolean;
}) {
  return (
    <Card>
      <div className="relative w-full lg:w-1/3 h-72 flex-shrink-0">
        <Image
          src={campaign.products[0].main_image_url}
          width={1000}
          height={1000}
          alt={campaign.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute left-4 top-4">
          <Badge
            icon={<TimerResetIcon width={16} />}
            value={getTimeDiff(campaign.start_time, campaign.end_time).text}
          />
        </div>
      </div>

      <div className="w-full lg:w-5/12 px-3 lg:px-8 py-4">
        <Title tag="h3" title={campaign.name} subtitle={'Locked'} />

        <Box
          icon={<TimerIcon width={16} />}
          label="Campaign progress"
          className="w-full lg:w-96 mb-4"
        >
          <ProgressBar
            progress={
              getTimeDiff(campaign.start_time, campaign.end_time).progress
            }
            label={getTimeDiff(campaign.start_time, campaign.end_time).text}
          />
        </Box>

        <Badge
          button={
            <Button size="sm" asChild>
              <Link
                href={`/${isSeller ? 'seller' : 'creator'}/campaigns/${campaign.id}`}
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
          value={`${campaign.product_count}`}
          label="Products"
          size="lg"
          className="w-full py-3 mb-3"
        />

        <Badge
          icon={<CircleDollarSignIcon size={16} />}
          value={`${campaign.creator_invited_count}`}
          label="Invited Creators"
          size="lg"
          className="w-full py-3 mb-3"
        />

        <Badge
          icon={<VideoIcon size={16} />}
          value={`${campaign.showcase_creator_count}`}
          label="Showcase Creators"
          size="lg"
          className="w-full py-3"
        />
      </div>
    </Card>
  );
}
