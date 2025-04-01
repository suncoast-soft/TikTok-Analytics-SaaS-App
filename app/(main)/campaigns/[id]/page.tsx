import { TimerIcon, TrophyIcon } from 'lucide-react';
import Image from 'next/image';
import Card from '@/components/modules/Card';
import Box from '@/components/modules/Box';
import ProductInfoTable from '@/components/sections/ProductInfoTable';
import Reward from '@/components/modules/Reward';
import ProgressBar from '@/components/modules/ProgressBar';
import { getTimeDiff } from '@/utils/helpers';
import Title from '@/components/modules/Title';
import { createClient } from '@/utils/supabase/server';
import { getCampaign } from '@/utils/supabase/queries';
import { SellerCampaignDetail } from '@/types/tiktok';
import { Tables } from '@/types/db';
import ImageBox from '@/components/modules/ImageBox';

type Campaign = Tables<'campaigns'> & {
  users: {
    seller_name: string;
  };
};

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
  const rewards = (campaign.rewards ?? []) as unknown as RewardProps[];
  const { products, creator_invited_count } =
    details as unknown as SellerCampaignDetail;
  const productThumbnail = products?.[0]?.main_image_url;

  return (
    <div className="container max-w-6xl py-12">
      <Card className="p-4 lg:p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          {productThumbnail && (
            <Image
              src={productThumbnail}
              width={320}
              height={240}
              alt={name || 'Product Thumbnail'}
              className="w-80 h-60 object-cover rounded-lg"
            />
          )}

          <div>
            <Title title={name!} subtitle={seller_name} />

            <div className="flex flex-col md:flex-row gap-4">
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
      </Card>

      <Card className="p-4 lg:p-8 mb-12">
        <Title title="About the Campaign" description={message!} tag="h2" />

        <Title title="How to Start" tag="h2" />

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <ImageBox
            title="Join the Campaign"
            description="Sign up to be part of our exclusive campaign and gain access to special offers. Simply fill out the required details and confirm your participation."
            image="/icons/register.png"
          />

          <ImageBox
            title="Request Your Sample"
            description="Once you’ve joined, submit your request to receive a free sample. Follow the provided instructions to ensure quick and easy delivery."
            image="/icons/sample.png"
          />
        </div>

        <Title title="Campaign Rewards" tag="h2" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {rewards?.map((reward, index) => (
            <Reward
              key={index}
              tier={index + 1}
              target={reward.target}
              reward={reward.reward}
            />
          ))}
        </div>
      </Card>

      <Title title="Campaign product details" tag="h2" />

      <ProductInfoTable products={products} />
    </div>
  );
}
