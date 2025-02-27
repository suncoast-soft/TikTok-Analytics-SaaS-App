import { active_campaigns } from '@/utils/mock';
import {
  ShoppingBagIcon,
  TimerIcon,
  TrophyIcon,
  VideoIcon
} from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Card from '@/components/modules/Card';
import Box from '@/components/modules/Box';
import ProductInfoTable from '@/components/sections/ProductInfoTable';
import Reward from '@/components/modules/Reward';
import ProgressBar from '@/components/modules/ProgressBar';
import { getTimeDiff } from '@/utils/helpers';
import Title from '@/components/modules/Title';
import { createClient } from '@/utils/supabase/server';
import { getCampaign } from '@/utils/supabase/queries';
import { Tables } from '@/types/db';

type Campaign = Tables<'campaigns'>;
interface Reward {
  target: number;
  reward: number;
}

export default async function Campaign({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const campaign_id = (await params).id;
  const campaignMockData = active_campaigns.filter(
    (c) => c.id === campaign_id
  )[0];

  if (!campaignMockData) {
    return notFound();
  }

  const supabase = await createClient();
  const campaignData = (await getCampaign(
    supabase,
    '7470079187999688490'
  )) as Campaign;

  const campaign = { ...campaignMockData, ...campaignData };
  const rewards = Array.isArray(campaign.rewards)
    ? (campaign.rewards as unknown as Reward[])
    : [];

  return (
    <div className="container max-w-7xl py-12">
      <Card vertical={true} className="p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
          <Image
            src={campaign.products[0].main_image_url}
            width={320}
            height={240}
            alt={campaign.name}
            className="w-80 h-60 object-cover rounded-lg"
          />

          <div>
            <Title title={campaign.name} subtitle={'Locked'} />

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

        <div className="flex flex-col lg:flex-row gap-5 mb-12">
          <Box
            icon={<ShoppingBagIcon width={16} />}
            value={55}
            label="Orders"
            buttonName="View orders"
            buttonLink={`/creator/campaigns/${campaign.id}`}
            className="w-60"
          />

          <Box
            icon={<VideoIcon width={16} />}
            value={3}
            label="Videos"
            buttonName="Video Analytics"
            buttonLink={`/creator/campaigns/${campaign.id}`}
            className="w-60"
          />

          <Box
            icon={<VideoIcon width={16} />}
            value={`$12,400`}
            label="GMV"
            buttonName="Daily GMV Report"
            buttonLink={`/creator/campaigns/${campaign.id}`}
            className="w-60"
          />
        </div>

        <Title title="Product Details" tag="h2" />

        <ProductInfoTable products={campaign.products} />

        <Title title="Your Reward Status" tag="h2" />

        {rewards?.length > 0 && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
              {rewards?.map((reward, index) => (
                <Reward
                  key={index}
                  tier={index + 1}
                  target={reward.target}
                  reward={reward.reward}
                  progress={12400}
                />
              ))}
            </div>

            <div className="w-full relative">
              <ProgressBar
                progress={(12400 / rewards[rewards.length - 1].target) * 100}
                label={`$12,400`}
                labelPosition="percentage"
              />
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
