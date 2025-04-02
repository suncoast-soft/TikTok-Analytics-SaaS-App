import Badge from '@/components/modules/Badge';
import Box from '@/components/modules/Box';
import Brand from '@/components/modules/Brand';
import Card from '@/components/modules/Card';
import Title from '@/components/modules/Title';
import { Button } from '@/components/ui/button';
import { Tables } from '@/types/db';
import { SellerCampaignDetail } from '@/types/tiktok';
import { checkReward, displayMoney, getTimeDiff } from '@/utils/helpers';
import { getSellerOrders } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import {
  CircleDollarSignIcon,
  ShoppingBagIcon,
  TimerResetIcon,
  TrophyIcon,
  VideoIcon
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Campaign = Tables<'campaigns'> & {
  users: {
    seller_name: string;
  };
};
type Order = Tables<'orders'>;

interface RewardProps {
  target: number;
  reward: number;
}

export async function EndedLargeCampaignCard({
  campaign
}: {
  campaign: Campaign;
}) {
  const supabase = await createClient();

  const { campaign_id, name, start_time, end_time, details, users } = campaign;
  const seller_name = users?.seller_name ?? '';
  const rewards = (campaign.rewards ?? []) as unknown as RewardProps[];
  const { products } = details as unknown as SellerCampaignDetail;
  const productThumbnail = products?.[0]?.main_image_url;

  /**
   * Order Details
   * Temp Disable Getting Creator Order. NO orders to see for now.
   */
  // const user = (await getUser(supabase)) as User;
  // const orders = (await getCreatorOrders(
  //   supabase,
  //   campaignId,
  //   user.creator_username
  // )) as Order[];
  const orders = (await getSellerOrders(supabase, campaign_id!)) as Order[];

  /**
   * Affiliate Data
   */
  const videos = Array.from(new Set(orders.map((order) => order.video_id)));
  const gmv = orders.reduce(
    (sum, order) => sum + (order.commission_base ?? 0),
    0
  );
  const commission = orders.reduce(
    (sum, order) => sum + (order.paid_commission ?? 0),
    0
  );

  const reward = checkReward(rewards, gmv);

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

          <div className="absolute left-4 top-4">
            <Badge
              icon={<TimerResetIcon width={16} />}
              value={getTimeDiff(start_time!, end_time!).text}
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 px-3 lg:px-8">
          <Brand tag="h4" brand={seller_name} />
          <Title tag="h3" title={name!} className="mb-4" />

          <Badge
            button={
              <Button size="sm" asChild>
                <Link href={`/creator/campaigns/${campaign_id}`}>
                  View Details
                </Link>
              </Button>
            }
            className="mb-8"
          />

          <div className="flex gap-4 items-center">
            <Box
              icon={<CircleDollarSignIcon size={16} className="text-white" />}
              label="Commission"
              className="bg-purple w-40"
            >
              <p className="text-white text-xl font-medium">
                {displayMoney(commission)}
              </p>
            </Box>

            <div className="text-4xl text-white">+</div>

            <Box
              icon={<TrophyIcon size={16} className="text-white" />}
              label="Cash Reward"
              className="bg-blue w-40"
            >
              <p className="text-white text-xl font-medium">
                {displayMoney(reward)}
              </p>
            </Box>
          </div>
        </div>

        <div className="w-full lg:w-1/4 px-3 lg:px-8">
          <Badge
            icon={<ShoppingBagIcon size={16} />}
            value={`${orders.length}`}
            label="Orders"
            size="lg"
            className="w-full py-3 mb-3"
          />

          <Badge
            icon={<CircleDollarSignIcon size={16} />}
            value={displayMoney(gmv)}
            label="GMV"
            size="lg"
            className="w-full py-3 mb-3"
          />

          <Badge
            icon={<VideoIcon size={16} />}
            value={`${videos.length}`}
            label="Showcase Videos"
            size="lg"
            className="w-full py-3"
          />
        </div>
      </div>
    </Card>
  );
}
