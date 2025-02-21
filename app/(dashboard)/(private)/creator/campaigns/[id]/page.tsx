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

export default async function Campaign({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const campaign_id = (await params).id;
  const campaign = active_campaigns.filter((c) => c.id === campaign_id)[0];

  if (!campaign) {
    return notFound();
  }

  return (
    <div className="container max-w-7xl py-12">
      <Card vertical={true} className="p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
          <Image
            src={campaign.brand_logo}
            width={320}
            height={240}
            alt={campaign.brand}
            className="w-80 h-60 object-cover rounded-lg"
          />

          <div>
            <Title title={campaign.name} subtitle={campaign.brand} />

            <div className="flex flex-col lg:flex-row gap-4">
              <Box
                icon={<TimerIcon width={16} />}
                label="Campaign progress"
                className="w-60"
              >
                <ProgressBar
                  progress={
                    getTimeDiff(campaign.start_date, campaign.end_date).progress
                  }
                  label={
                    getTimeDiff(campaign.start_date, campaign.end_date).text
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
          description={campaign.description}
          tag="h2"
        />

        <div className="flex flex-col lg:flex-row gap-5 mb-12">
          <Box
            icon={<ShoppingBagIcon width={16} />}
            value={campaign.progress.orders}
            label="Orders"
            buttonName="View orders"
            buttonLink={`/creator/campaigns/${campaign.id}`}
            className="w-60"
          />

          <Box
            icon={<VideoIcon width={16} />}
            value={campaign.progress.videos}
            label="Videos"
            buttonName="Video Analytics"
            buttonLink={`/creator/campaigns/${campaign.id}`}
            className="w-60"
          />

          <Box
            icon={<VideoIcon width={16} />}
            value={`$${campaign.progress.gmv.toLocaleString()}`}
            label="GMV"
            buttonName="Daily GMV Report"
            buttonLink={`/creator/campaigns/${campaign.id}`}
            className="w-60"
          />
        </div>

        <Title title="Product Details" tag="h2" />

        <ProductInfoTable products={campaign.products} />

        <Title title="Your Reward Status" tag="h2" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          {campaign.milestones.map((milestone, index) => (
            <Reward
              key={index}
              tier={index + 1}
              target={milestone.target_gmv}
              reward={milestone.reward}
              progress={campaign.progress.gmv}
            />
          ))}
        </div>

        <div className="w-full relative">
          <ProgressBar
            progress={
              (campaign.progress.gmv /
                campaign.milestones[campaign.milestones.length - 1]
                  .target_gmv) *
              100
            }
            label={`$${campaign.progress.gmv.toLocaleString()}`}
            labelPosition="percentage"
          />
        </div>
      </Card>
    </div>
  );
}
