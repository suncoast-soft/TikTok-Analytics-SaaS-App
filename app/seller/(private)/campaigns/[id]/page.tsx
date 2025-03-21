/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CircleDollarSignIcon,
  ShoppingBagIcon,
  TimerIcon,
  TrophyIcon,
  VideoIcon
} from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import Card from '@/components/modules/Card';
import Box from '@/components/modules/Box';
import ProductInfoTable from '@/components/sections/ProductInfoTable';
import ProgressBar from '@/components/modules/ProgressBar';
import { getTimeDiff } from '@/utils/helpers';
import Title from '@/components/modules/Title';
import { requestTikTokShopAPIClient } from '@/app/actions';
import { SellerCampaignDetail } from '@/types/tiktok';
import { getCampaign, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { Tables } from '@/types/db';
import RewardForm from '@/components/sections/Forms/RewardForm';

type User = Tables<'users'>;
type Campaign = Tables<'campaigns'>;

const fetchCampaign = async (campaign_id: string) => {
  const data = await requestTikTokShopAPIClient(
    `/affiliate_seller/202412/target_collaborations/${campaign_id}`,
    {},
    'GET',
    ''
  );

  return data?.data?.target_collaboration ?? {};
};

export default async function CampaignPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const campaign_id = (await params).id;

  const campaignAPIData = (await fetchCampaign(
    campaign_id
  )) as SellerCampaignDetail;

  if (!campaignAPIData) {
    redirect('/seller');
  }

  console.log(campaignAPIData);

  // Get Configured Campaign data from database
  const supabase = await createClient();
  const seller = (await getUser(supabase)) as User;
  const campaignData = (await getCampaign(supabase, campaign_id)) as Campaign;

  const campaign = { ...campaignAPIData, ...campaignData };

  return (
    <div className="container max-w-7xl py-12">
      <Card vertical={true} className="p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
          <Image
            src={campaignAPIData.products[0].main_image_url}
            width={320}
            height={320}
            alt={seller.seller_name ?? 'Seller Logo'}
            className="w-80 h-80 object-contain rounded-lg"
          />

          <div>
            <Title title={campaign.name} subtitle={seller.seller_name!} />

            <div className="flex flex-col lg:flex-row gap-4">
              <Box
                icon={<TimerIcon width={16} />}
                label="Campaign progress"
                className="w-60"
              >
                <ProgressBar
                  progress={
                    getTimeDiff(campaign.start_time, campaign.end_time).progress
                  }
                  label={
                    getTimeDiff(campaign.start_time, campaign.end_time).text
                  }
                />
              </Box>

              <Box
                icon={<TrophyIcon width={16} />}
                label="Total Creators"
                className="w-60"
              >
                <p className="text-white text-2xl font-bold">322</p>
              </Box>
            </div>
          </div>
        </div>

        <Title
          title="About the Campaign"
          description={campaign.message}
          tag="h2"
        />

        <div className="flex lg:flex-row gap-4 mb-12">
          <Box icon={<ShoppingBagIcon size={16} />} label="Products">
            <span className="text-2xl font-bold text-white">{`${campaign.product_count}`}</span>
          </Box>

          <Box
            icon={<CircleDollarSignIcon size={16} />}
            label="Invited Creators"
          >
            <span className="text-2xl font-bold text-white">{`${campaign.creator_invited_count}`}</span>
          </Box>

          <Box icon={<VideoIcon size={16} />} label="Showcase Creators">
            <span className="text-2xl font-bold text-white">{`${campaign.showcase_creator_count}`}</span>
          </Box>
        </div>

        <Title title="Product Details" tag="h2" />

        <ProductInfoTable products={campaign.products} />

        <Title title="Configure Rewards" tag="h2" />

        <RewardForm
          campaignId={campaign_id}
          rewards={campaign.rewards as any}
        />
      </Card>
    </div>
  );
}
