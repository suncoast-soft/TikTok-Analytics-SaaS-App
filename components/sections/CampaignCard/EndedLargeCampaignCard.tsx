import Badge from '@/components/modules/Badge';
import Box from '@/components/modules/Box';
import Card from '@/components/modules/Card';
import Title from '@/components/modules/Title';
import { Tables } from '@/types/db';
import { SellerCampaignDetail } from '@/types/tiktok';
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

type Campaign = Tables<'campaigns'>;

export function EndedLargeCampaignCard({ campaign }: { campaign: Campaign }) {
  const { name, end_time, details } = campaign;
  const {
    products,
    product_count,
    creator_invited_count,
    showcase_creator_count
  } = details as unknown as SellerCampaignDetail;
  const productThumbnail = products?.[0]?.main_image_url;

  return (
    <Card>
      <div className="relative w-full lg:w-1/3 h-72 flex-shrink-0">
        {productThumbnail && (
          <Image
            src={productThumbnail}
            width={1000}
            height={1000}
            alt={name || 'Product Thumbnail'}
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute left-4 top-4">
          <Badge icon={<TimerResetIcon width={16} />} value="Ended" />
        </div>
      </div>

      <div className="w-full lg:w-5/12 px-3 lg:px-8 py-4">
        <Title tag="h3" title={name!} subtitle={'Locked'} />

        <Box
          icon={<TimerIcon size={16} />}
          label={`Campaign ended on ${format(end_time!, 'PPP')}`}
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
          value={`${product_count}`}
          label="Products"
          size="lg"
          className="w-full py-3 mb-3"
        />

        <Badge
          icon={<CircleDollarSignIcon size={16} />}
          value={`${creator_invited_count}`}
          label="Invited Creators"
          size="lg"
          className="w-full py-3 mb-3"
        />

        <Badge
          icon={<VideoIcon size={16} />}
          value={`${showcase_creator_count}`}
          label="Showcase Creators"
          size="lg"
          className="w-full py-3"
        />
      </div>
    </Card>
  );
}
