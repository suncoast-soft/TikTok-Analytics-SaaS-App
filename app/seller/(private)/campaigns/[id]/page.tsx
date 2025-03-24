import {
  CircleDollarSignIcon,
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
import { getCampaign, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { Tables } from '@/types/db';
import RewardForm from '@/components/sections/Forms/RewardForm';
import { redirect } from 'next/navigation';
import { SellerCampaignDetail } from '@/types/tiktok';

type User = Tables<'users'>;
type Campaign = Tables<'campaigns'>;

export default async function CampaignPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const campaign_id = (await params).id;

  // Get Configured Campaign data from database
  const supabase = await createClient();
  const seller = (await getUser(supabase)) as User;
  const campaign = (await getCampaign(supabase, campaign_id)) as Campaign;

  if (!campaign) {
    redirect('/seller');
  }

  const { name, start_time, end_time, message, rewards, details } = campaign;
  const {
    products,
    showcase_creator_count,
    creator_invited_count,
    product_count
  } = details as unknown as SellerCampaignDetail;
  const productThumbnail = products?.[0]?.main_image_url;

  return (
    <div className="container max-w-7xl py-12">
      <Card vertical={true} className="p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
          {productThumbnail && (
            <Image
              src={productThumbnail}
              width={320}
              height={320}
              alt={seller.seller_name ?? 'Seller Logo'}
              className="w-80 h-80 object-contain rounded-lg"
            />
          )}

          <div>
            <Title title={name!} subtitle={seller.seller_name!} />

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
                <p className="text-white text-2xl font-bold">322</p>
              </Box>
            </div>
          </div>
        </div>

        <Title title="About the Campaign" description={message!} tag="h2" />

        <div className="flex lg:flex-row gap-4 mb-12">
          <Box icon={<ShoppingBagIcon size={16} />} label="Products">
            <span className="text-2xl font-bold text-white">{`${product_count}`}</span>
          </Box>

          <Box
            icon={<CircleDollarSignIcon size={16} />}
            label="Invited Creators"
          >
            <span className="text-2xl font-bold text-white">{`${creator_invited_count}`}</span>
          </Box>

          <Box icon={<VideoIcon size={16} />} label="Showcase Creators">
            <span className="text-2xl font-bold text-white">{`${showcase_creator_count}`}</span>
          </Box>
        </div>

        <Title title="Product Details" tag="h2" />

        <ProductInfoTable products={products} />

        <Title title="Configure Rewards" tag="h2" />

        <RewardForm
          campaignId={campaign_id}
          rewards={rewards as { target: string; reward: string }[]}
        />
      </Card>
    </div>
  );
}
