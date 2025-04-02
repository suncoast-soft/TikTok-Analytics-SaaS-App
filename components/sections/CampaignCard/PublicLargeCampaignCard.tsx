import Badge from '@/components/modules/Badge';
import Brand from '@/components/modules/Brand';
import Card from '@/components/modules/Card';
import GradientOverlay from '@/components/modules/GradientOverlay';
import Title from '@/components/modules/Title';
import { Button } from '@/components/ui/button';
import { Tables } from '@/types/db';
import { SellerCampaignDetail } from '@/types/tiktok';
import { getTimeDiff } from '@/utils/helpers';
import { TimerIcon, TrophyIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Campaign = Tables<'campaigns'> & {
  users: {
    seller_name: string;
  };
};

export function PublicLargeCampaignCard({ campaign }: { campaign: Campaign }) {
  const { campaign_id, name, start_time, end_time, details, users } = campaign;
  const seller_name = users?.seller_name ?? '';
  const { products } = details as unknown as SellerCampaignDetail;
  const productThumbnail = products?.[0]?.main_image_url;

  return (
    <Card className="p-0 bg-transparent mb-12">
      <div className="flex flex-col lg:flex-row h-fit lg:h-40">
        <div className="w-full lg:w-1/2 px-8 py-6">
          <Brand tag="h4" brand={seller_name} />
          <Title tag="h3" title={name!} className="mb-5" />

          <Badge
            button={
              <Button variant="secondary" asChild>
                <Link href={`/campaigns/${campaign_id}`}>Learn More</Link>
              </Button>
            }
            icon={<TimerIcon width={16} />}
            value={getTimeDiff(start_time!, end_time!).text}
          />
        </div>

        <div className="relative w-full lg:w-1/2 h-full">
          {productThumbnail && (
            <Image
              src={productThumbnail}
              width={5472}
              height={3648}
              alt="Register"
              className="w-full h-full object-cover object-center"
            />
          )}

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
      </div>
    </Card>
  );
}
