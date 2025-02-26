import Badge from '@/components/modules/Badge';
import Card from '@/components/modules/Card';
import { Button } from '@/components/ui/button';
import { getTimeDiff } from '@/utils/helpers';
import { TimerIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PublicSmallCampaignCard({ campaign }: { campaign: any }) {
  return (
    <Card className="p-3">
      <div className="w-full">
        <Badge
          icon={<TimerIcon width={16} />}
          value={getTimeDiff(campaign.start_date, campaign.end_date).text}
        />

        <h2 className="text-white text-sm font-bold mt-2 mb-1">
          {campaign.name}
        </h2>

        <p className="text-navy-300 text-xs tracking-wide mb-3 line-clamp-2">
          {campaign.description}
        </p>

        <Badge
          button={
            <Button size="sm" asChild>
              <Link href={`/campaigns/${campaign.id}`}>Learn More</Link>
            </Button>
          }
        />
      </div>

      <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={campaign.brand_logo}
          width={1000}
          height={1000}
          alt={campaign.brand}
          className="w-full h-full object-cover"
        />
      </div>
    </Card>
  );
}
