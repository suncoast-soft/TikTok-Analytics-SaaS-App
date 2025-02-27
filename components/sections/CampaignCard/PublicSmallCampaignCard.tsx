import Badge from '@/components/modules/Badge';
import Card from '@/components/modules/Card';
import { Button } from '@/components/ui/button';
import { SellerCampaignDetail } from '@/types/tiktok';
import { getTimeDiff } from '@/utils/helpers';
import { TimerIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function PublicSmallCampaignCard({
  campaign
}: {
  campaign: SellerCampaignDetail;
}) {
  return (
    <Card className="p-3">
      <div className="w-full">
        <Badge
          icon={<TimerIcon width={16} />}
          value={getTimeDiff(campaign.start_time, campaign.end_time).text}
        />

        <h2 className="text-white text-sm font-bold mt-2 mb-1">
          {campaign.name}
        </h2>

        <p className="text-navy-300 text-xs tracking-wide mb-3 line-clamp-2">
          {campaign.message}
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
          src={campaign.products[0].main_image_url}
          width={1000}
          height={1000}
          alt={campaign.name}
          className="w-full h-full object-cover"
        />
      </div>
    </Card>
  );
}
