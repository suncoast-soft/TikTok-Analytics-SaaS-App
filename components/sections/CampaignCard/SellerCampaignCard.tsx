import Badge from '@/components/modules/Badge';
import Box from '@/components/modules/Box';
import Card from '@/components/modules/Card';
import ProgressBar from '@/components/modules/ProgressBar';
import Title from '@/components/modules/Title';
import { Button } from '@/components/ui/button';
import { SellerCampaignOverview } from '@/types/tiktok';
import { getTimeDiff } from '@/utils/helpers';
import {
  CircleDollarSignIcon,
  ShoppingBagIcon,
  TimerIcon,
  VideoIcon
} from 'lucide-react';
import Link from 'next/link';
import { Tables } from '@/types/db';

type Seller = Tables<'sellers'>;

export function SellerCampaignCard({
  campaign,
  seller
}: {
  campaign: SellerCampaignOverview;
  seller: Seller;
}) {
  return (
    <Card>
      <div className="w-full lg:w-5/12 px-3 lg:px-8 py-4">
        <Title
          tag="h3"
          title={campaign.name}
          subtitle={seller.seller_name ?? 'Flicker'}
        />

        <Box
          icon={<TimerIcon width={16} />}
          label="Campaign progress"
          className="w-full lg:w-96 mt-5"
        >
          <ProgressBar
            progress={
              getTimeDiff(campaign.start_time, campaign.end_time).progress
            }
            label={getTimeDiff(campaign.start_time, campaign.end_time).text}
          />
        </Box>
      </div>

      <div className="relative w-full lg:w-1/3 px-3 lg:px-8 py-4">
        <h4 className="text-white text-xl font-bold">Reward deals</h4>
        <p className="mb-5">No reward milestones configured yet</p>

        <Badge
          button={
            <Button size="sm" asChild>
              <Link href={`/seller/campaigns/${campaign.id}`}>
                Manage Reward Milestones
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
          value={`${campaign.creator_inivited_count}`}
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
