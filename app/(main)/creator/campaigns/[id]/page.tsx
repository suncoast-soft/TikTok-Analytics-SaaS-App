import {
  CheckCircle2Icon,
  FileChartColumnIncreasingIcon,
  FilmIcon,
  ShoppingBagIcon,
  TimerIcon
} from 'lucide-react';
import Image from 'next/image';
import Card from '@/components/modules/Card';
import Box from '@/components/modules/Box';
import ProductInfoTable from '@/components/sections/ProductInfoTable';
import ProgressBar from '@/components/modules/ProgressBar';
import { getTimeDiff } from '@/utils/helpers';
import Title from '@/components/modules/Title';
import { createClient } from '@/utils/supabase/server';
import { getCampaign, getSellerOrders } from '@/utils/supabase/queries';
import { SellerCampaignDetail } from '@/types/tiktok';
import { Tables } from '@/types/db';
import GradientBorder from '@/components/modules/GradientBorder';
import Rewards from '@/components/modules/Reward';

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

export default async function CampaignDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const campaignId = (await params).id;
  const supabase = await createClient();

  /**
   * Campaign Data
   */
  const campaign = (await getCampaign(supabase, campaignId)) as Campaign;
  const {
    name,
    message,
    start_time,
    end_time,
    details,
    users: { seller_name }
  } = campaign;
  const rewards = ((campaign.rewards ?? []) as unknown as RewardProps[]).filter(
    (reward) => reward.reward > 0 && reward.target > 0
  );
  const { products } = details as unknown as SellerCampaignDetail;
  const productThumbnail = products?.[0]?.main_image_url;

  /**
   * Order Details
   * Temp. use getCreatorOrders
   */
  const orders = (await getSellerOrders(supabase, campaignId)) as Order[];

  /**
   * Affiliate Data
   */
  const videos = Array.from(new Set(orders.map((order) => order.video_id)));
  const gmv = orders.reduce(
    (sum, order) => sum + (order.commission_base ?? 0),
    0
  );

  return (
    <div className="container max-w-7xl py-12">
      <Card className="mb-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div>
            {productThumbnail && (
              <Image
                src={productThumbnail}
                width={192}
                height={192}
                alt={name || 'Product Thumbnail'}
                className="w-48 h-48 object-cover rounded-xl mb-2"
              />
            )}

            <div className="rounded-lg bg-navy-800 text-green text-sm text-center py-2 px-2">
              {`${'20'}% Commissions`}
            </div>
          </div>

          <div>
            <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-purple to-blue bg-clip-text text-transparent mb-4">
              {seller_name}
            </h2>

            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <Box
                icon={<FileChartColumnIncreasingIcon />}
                value={`$${gmv.toLocaleString()}`}
                label="GMV"
              />

              <Box
                icon={<ShoppingBagIcon />}
                value={orders?.length}
                label="Orders"
              />

              <Box icon={<FilmIcon />} value={videos.length} label="Videos" />
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <Box
                icon={<TimerIcon width={20} />}
                label="Campaign progress"
                className="w-80"
              >
                <ProgressBar
                  progress={getTimeDiff(start_time!, end_time!).progress}
                  label={getTimeDiff(start_time!, end_time!).text}
                />
              </Box>

              <GradientBorder className="h-fit my-auto">
                <Card className="rounded-xl bg-navy-800/70 py-3">
                  <div className="flex gap-4 justify-center w-60 text-white text-lg font-medium text-center">
                    <CheckCircle2Icon />
                    <span>Joined</span>
                  </div>
                </Card>
              </GradientBorder>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 lg:p-8 mb-8">
        <Title
          title={name!}
          description={message!}
          tag="h2"
          className="-mb-8"
        />
      </Card>

      {rewards.length > 0 && (
        <Card className="p-4 lg:p-8 mb-8 bg-navy-800">
          <Title title="Your Reward Status" tag="h2" />
          <Rewards rewards={rewards} gmv={gmv} />
        </Card>
      )}

      <Title title="Product Details" tag="h2" />
      <ProductInfoTable products={products} />
    </div>
  );
}
