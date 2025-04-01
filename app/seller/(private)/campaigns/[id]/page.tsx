import {
  ShoppingBagIcon,
  TimerIcon,
  TrophyIcon,
  VideoIcon
} from 'lucide-react';
import Image from 'next/image';
import Card from '@/components/modules/Card';
import Box from '@/components/modules/Box';
import ProductInfoTable from '@/components/sections/ProductInfoTable';
import ProgressBar from '@/components/modules/ProgressBar';
import { getTimeDiff } from '@/utils/helpers';
import Title from '@/components/modules/Title';
import { getCampaign, getSellerOrders } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { Tables } from '@/types/db';
import RewardForm from '@/components/sections/Forms/RewardForm';
import { SellerCampaignDetail } from '@/types/tiktok';

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

export default async function CampaignPage({
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
    campaign_id,
    name,
    message,
    start_time,
    end_time,
    details,
    users: { seller_name }
  } = campaign;
  const rewards = (campaign.rewards ?? []) as unknown as RewardProps[];
  const { products, creator_invited_count } =
    details as unknown as SellerCampaignDetail;
  const productThumbnail = products?.[0]?.main_image_url;

  /**
   * Order Details
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
    <div className="container max-w-6xl py-12">
      <Card className="p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
          {productThumbnail && (
            <Image
              src={productThumbnail}
              width={320}
              height={320}
              alt={name ?? 'Seller Logo'}
              className="w-80 h-80 object-contain rounded-lg"
            />
          )}

          <div>
            <Title title={name!} subtitle={seller_name} />

            <div className="flex flex-col lg:flex-row gap-4">
              <Box
                icon={<TimerIcon width={16} />}
                label="Campaign progress"
                className="w-60"
              >
                <ProgressBar
                  progress={getTimeDiff(start_time!, end_time!).progress}
                  label={getTimeDiff(start_time!, end_time!).text}
                />
              </Box>

              <Box
                icon={<TrophyIcon width={16} />}
                label="Total Creators"
                className="w-60"
              >
                <p className="text-white text-2xl font-bold">
                  {creator_invited_count}
                </p>
              </Box>
            </div>
          </div>
        </div>

        <Title title="About the Campaign" description={message!} tag="h2" />

        <div className="flex flex-col lg:flex-row gap-5 mb-12">
          <Box
            icon={<ShoppingBagIcon width={16} />}
            value={orders?.length}
            label="Orders"
            buttonName="View orders"
            buttonLink={`/creator/campaigns/${campaign_id}`}
            className="w-60"
          />

          <Box
            icon={<VideoIcon width={16} />}
            value={videos.length}
            label="Videos"
            buttonName="Video Analytics"
            buttonLink={`/creator/campaigns/${campaign_id}`}
            className="w-60"
          />

          <Box
            icon={<VideoIcon width={16} />}
            value={`$${gmv.toLocaleString()}`}
            label="GMV"
            buttonName="Daily GMV Report"
            buttonLink={`/creator/campaigns/${campaign_id}`}
            className="w-60"
          />
        </div>

        <Title title="Product Details" tag="h2" />

        <ProductInfoTable products={products} />

        <Title title="Configure Rewards" tag="h2" />

        <RewardForm
          campaignId={campaign_id!}
          rewards={rewards as RewardProps[]}
        />
      </Card>
    </div>
  );
}
