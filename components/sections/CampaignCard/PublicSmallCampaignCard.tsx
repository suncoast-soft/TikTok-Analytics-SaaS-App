import Badge from '@/components/modules/Badge';
import Brand from '@/components/modules/Brand';
import Card from '@/components/modules/Card';
import Title from '@/components/modules/Title';
import { Button } from '@/components/ui/button';
import { Tables } from '@/types/db';
import { SellerCampaignDetail } from '@/types/tiktok';
import { getTimeDiff } from '@/utils/helpers';
import { TimerIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Campaign = Tables<'campaigns'> & {
  users: {
    seller_name: string;
  };
};

export function PublicSmallCampaignCard({ campaign }: { campaign: Campaign }) {
  const { campaign_id, name, start_time, end_time, details, users } = campaign;
  const seller_name = users?.seller_name ?? '';
  const { products } = details as unknown as SellerCampaignDetail;
  const productThumbnail = products?.[0]?.main_image_url;

  return (
    <Card className="p-3">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full">
          <Brand tag="h5" brand={seller_name} />
          <Title tag="h4" title={name!} className="mb-1" />

          <div className="flex gap-2 items-center text-xs text-white mb-4">
            <TimerIcon width={16} className="text-blue" />
            <span>{getTimeDiff(start_time!, end_time!).text}</span>
          </div>

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
      </div>
    </Card>
  );
}
