import { all_campaigns } from '@/utils/mock';
import { TimerIcon, TrophyIcon } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Card from '@/components/modules/Card';
import Title from '@/components/modules/Title';
import Box from '@/components/modules/Box';
import ProgressBar from '@/components/modules/ProgressBar';
import { getTimeDiff } from '@/utils/helpers';
import ImageBox from '@/components/modules/ImageBox';
import Reward from '@/components/modules/Reward';
import ProductInfoTable from '@/components/sections/ProductInfoTable';

export default async function Campaign({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const campaign_id = (await params).id;
  const campaign = all_campaigns.filter((c) => c.id === campaign_id)[0];

  if (!campaign) {
    return notFound();
  }

  return (
    <div className="container max-w-7xl py-12">
      <Card vertical={true} className="p-4 lg:p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <Image
            src={campaign.brand_logo}
            width={320}
            height={240}
            alt={campaign.brand}
            className="w-80 h-60 object-cover rounded-lg"
          />

          <div>
            <Title title={campaign.name} subtitle={campaign.brand} />

            <div className="flex flex-col md:flex-row gap-4">
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
          {campaign.milestones.map((milestone, index) => (
            <Reward
              key={index}
              tier={index + 1}
              target={milestone.target_gmv}
              reward={milestone.reward}
            />
          ))}
        </div>

        <Title title="Other Terms" tag="h2" />

        <ol className="list-disc text-sm md:text-base leading-relaxed pl-6">
          {campaign.terms.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ol>
      </Card>

      <Title title="Campaign product details" tag="h2" />

      <ProductInfoTable products={campaign.products} />
    </div>
  );
}
