import {
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
import { displayNumber, getTimeDiff } from '@/utils/helpers';
import Title from '@/components/modules/Title';
import { createClient } from '@/utils/supabase/server';
import { getCampaign, getUser } from '@/utils/supabase/queries';
import { SellerCampaignDetail } from '@/types/tiktok';
import { Tables } from '@/types/db';
import Rewards from '@/components/sections/Reward';
import Description from '@/components/modules/Description';
import Brand from '@/components/modules/Brand';
import ImageBox from '@/components/modules/ImageBox';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import JoinCampaign from '@/components/modules/JoinCampaign';

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
  const user = await getUser(supabase);

  /**
   * Campaign Data
   */
  const campaign = (await getCampaign(supabase, campaignId)) as Campaign;
  const { name, message, start_time, end_time, details, users } = campaign;
  const seller_name = users?.seller_name ?? '';
  const {
    products,
    product_count,
    creator_invited_count,
    showcase_creator_count
  } = details as unknown as SellerCampaignDetail;

  const rewards = ((campaign.rewards ?? []) as unknown as RewardProps[]).filter(
    (reward) => reward.reward > 0 && reward.target > 0
  );
  const productThumbnail = products?.[0]?.main_image_url;
  const commission = products[0].commission.rate;

  return (
    <div className="container max-w-6xl py-0">
      <Card className="mb-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div>
            {productThumbnail && (
              <Image
                src={productThumbnail}
                width={192}
                height={192}
                alt={name || 'Product Thumbnail'}
                className="w-48 h-48 object-cover rounded-xl mb-4"
              />
            )}

            <div className="rounded-lg bg-navy-800 text-green text-sm text-center py-2 px-2">
              {`${commission / 100}% Commissions`}
            </div>
          </div>

          <div>
            <Brand brand={seller_name} className="mb-4" />

            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <Box
                icon={<FileChartColumnIncreasingIcon />}
                value={displayNumber(product_count)}
                label="Products"
              />

              <Box
                icon={<ShoppingBagIcon />}
                value={creator_invited_count}
                label="Creators Invited"
              />

              <Box
                icon={<FilmIcon />}
                value={showcase_creator_count}
                label="Showcase Creators"
              />
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

              <div className="h-fit my-auto">
                {user ? (
                  <JoinCampaign style="button" />
                ) : (
                  <Button className="w-60 py-3 h-12" asChild>
                    <Link href="/auth/register">Join Now</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <Title tag="h2" title={name!} className="mb-2" />
        <Description text={message!} />
      </Card>

      {rewards.length > 0 && (
        <Card className="bg-navy-800/60 mb-8">
          <Rewards rewards={rewards} showProgress={false} />
        </Card>
      )}

      <Card className="mb-8">
        <Title title="How to Start" tag="h2" className="mb-4" />

        <div className="grid md:grid-cols-2 gap-4">
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
      </Card>

      <Title title="Product Details" tag="h2" className="mb-5" />
      <ProductInfoTable products={products} />
    </div>
  );
}
