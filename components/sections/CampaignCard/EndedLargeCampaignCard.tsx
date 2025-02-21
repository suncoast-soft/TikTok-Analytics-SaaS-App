import Badge from '@/components/modules/Badge';
import Box from '@/components/modules/Box';
import Card from '@/components/modules/Card';
import Title from '@/components/modules/Title';
import { format } from 'date-fns';
import {
  CircleDollarSignIcon,
  ShoppingBagIcon,
  TimerIcon,
  TimerResetIcon,
  TrophyIcon,
  VideoIcon
} from 'lucide-react';
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EndedLargeCampaignCard({ campaign }: { campaign: any }) {
  return (
    <Card>
      <div className="relative w-full lg:w-1/3 h-72 flex-shrink-0">
        <Image
          src={campaign.brand_logo}
          width={1000}
          height={1000}
          alt={campaign.brand}
          className="w-full h-full object-cover"
        />

        <div className="absolute left-4 top-4">
          <Badge icon={<TimerResetIcon width={16} />} value="Ended" />
        </div>
      </div>

      <div className="w-full lg:w-5/12 px-3 lg:px-8 py-4">
        <Title tag="h3" title={campaign.name} subtitle={campaign.brand} />

        <Box
          icon={<TimerIcon size={16} />}
          label={`Campaign ended on ${format(campaign.end_date, 'PPP')}`}
          className="py-1.5 mb-6"
        />

        <div className="flex gap-4 items-center">
          <Box
            icon={<CircleDollarSignIcon size={16} />}
            label="Commission"
            className="bg-navy-500 w-40"
          >
            <p className="text-white text-2xl font-bold">{`$${'240'}`}</p>
          </Box>

          <div className="text-4xl text-white">+</div>

          <Box
            icon={<TrophyIcon size={16} className="text-white" />}
            label="Cash Reward"
            className="bg-amber-500 w-40"
          >
            <p className="text-white text-2xl font-bold">{`$${'1,000'}`}</p>
          </Box>
        </div>
      </div>

      <div className="w-full lg:w-1/4 px-3 lg:px-8 py-4">
        <Badge
          icon={<ShoppingBagIcon size={16} />}
          value={campaign.progress.orders}
          label="Orders"
          size="lg"
          className="w-full py-3 mb-3"
        />

        <Badge
          icon={<VideoIcon size={16} />}
          value={campaign.progress.videos}
          label="Videos"
          size="lg"
          className="w-full py-3 mb-3"
        />

        <Badge
          icon={<CircleDollarSignIcon size={16} />}
          value={`$${campaign.progress.gmv.toLocaleString()}`}
          label="GMV"
          size="lg"
          className="w-full py-3 mb-3"
        />
      </div>
    </Card>
  );
}
