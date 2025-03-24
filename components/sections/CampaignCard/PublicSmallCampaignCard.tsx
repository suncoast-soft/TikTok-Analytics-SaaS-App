import Badge from '@/components/modules/Badge';
import Card from '@/components/modules/Card';
import { Button } from '@/components/ui/button';
import { Tables } from '@/types/db';
import { SellerCampaignDetail } from '@/types/tiktok';
import { getTimeDiff } from '@/utils/helpers';
import { TimerIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Campaign = Tables<'campaigns'>;

export function PublicSmallCampaignCard({ campaign }: { campaign: Campaign }) {
  const { campaign_id, name, start_time, end_time, message, details } =
    campaign;
  const { products } = details as unknown as SellerCampaignDetail;
  const productThumbnail = products?.[0]?.main_image_url;

  return (
    <Card className="p-3">
      <div className="w-full">
        <Badge
          icon={<TimerIcon width={16} />}
          value={getTimeDiff(start_time!, end_time!).text}
        />

        <h2 className="text-white text-sm font-bold mt-2 mb-1">{name}</h2>

        <p className="text-navy-300 text-xs tracking-wide mb-3 line-clamp-2">
          {message}
        </p>

        <Badge
          button={
            <Button size="sm" asChild>
              <Link href={`/campaigns/${campaign_id}`}>Learn More</Link>
            </Button>
          }
        />
      </div>

      <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
        {productThumbnail && (
          <Image
            src={productThumbnail}
            width={1000}
            height={1000}
            alt={name || 'Campaign Image'}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </Card>
  );
}
