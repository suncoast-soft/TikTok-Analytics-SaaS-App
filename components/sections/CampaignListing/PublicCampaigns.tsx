import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  BoxesIcon,
  DumbbellIcon,
  HomeIcon,
  LaptopIcon,
  PlaneIcon,
  ShirtIcon,
  UtensilsIcon
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { PublicSmallCampaignCard } from '../CampaignCard';
import { SellerCampaignDetail } from '@/types/tiktok';

export function PublicCampaigns({
  selectedCategory,
  campaigns
}: {
  selectedCategory?: string;
  campaigns: SellerCampaignDetail[];
}) {
  const categories = [
    {
      icon: <ShirtIcon width={20} height={20} />,
      name: 'Fashion and Beauty'
    },
    {
      icon: <DumbbellIcon width={20} height={20} />,
      name: 'Fitness and Wellness'
    },
    {
      icon: <LaptopIcon width={20} height={20} />,
      name: 'Technology and Gadgets'
    },
    {
      icon: <HomeIcon width={20} height={20} />,
      name: 'Lifestyle and Home'
    },
    {
      icon: <UtensilsIcon width={20} height={20} />,
      name: 'Food and Beverage'
    },
    {
      icon: <PlaneIcon width={20} height={20} />,
      name: 'Travel and Experiences'
    },
    {
      icon: <BoxesIcon width={20} height={20} />,
      name: 'Others'
    }
  ];

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4 max-w-5xl">
        <Button
          className={cn('text-xs', !selectedCategory && 'bg-navy-500')}
          asChild
        >
          <Link href="/">All</Link>
        </Button>

        {categories.map((category) => (
          <Button
            key={category.name}
            className={cn(
              'text-xs',
              category.name === selectedCategory && 'bg-navy-500'
            )}
            asChild
          >
            <Link href={`/?category=${category.name}`}>
              {category.icon}
              {category.name}
            </Link>
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-12">
        {campaigns.map((campaign) => (
          <PublicSmallCampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </>
  );
}
