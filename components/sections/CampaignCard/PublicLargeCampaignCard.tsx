import Badge from '@/components/modules/Badge';
import Card from '@/components/modules/Card';
import GradientOverlay from '@/components/modules/GradientOverlay';
import { Button } from '@/components/ui/button';
import { getTimeDiff } from '@/utils/helpers';
import { TimerIcon, TrophyIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PublicLargeCampaignCard({ campaign }: { campaign: any }) {
  return (
    <Card className="mb-12 h-fit lg:h-40">
      <div className="w-full lg:w-1/2 px-8 py-6">
        <h3 className="text-amber-400 text-lg font-bold">{campaign.brand}</h3>

        <h2 className="text-white text-xl font-bold mb-4">{campaign.name}</h2>

        <Badge
          button={
            <Button variant="secondary" asChild>
              <Link href={`/campaigns/${campaign.id}`} className="no-underline">
                Learn More
              </Link>
            </Button>
          }
          icon={<TimerIcon width={16} />}
          value={getTimeDiff(campaign.start_date, campaign.end_date).text}
        />
      </div>

      <div className="relative w-full lg:w-1/2 h-full">
        <Image
          src={campaign.brand_logo}
          width={5472}
          height={3648}
          alt="Register"
          className="w-full h-full object-cover"
        />

        <GradientOverlay />

        <div className="absolute top-4 right-4">
          <Badge
            icon={<TrophyIcon width={16} />}
            value="$5,000"
            label="cash reward"
            className="py-2"
          />
        </div>
      </div>
    </Card>
  );
}
