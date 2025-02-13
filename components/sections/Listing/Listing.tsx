'use client';

import DarkShadow from '@/components/modules/DarkShadow';
import { Button } from '@/components/ui/button';
import { all_campaigns } from '@/utils/mock';
import { TimerIcon } from 'lucide-react';
import Image from 'next/image';
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
import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Listing() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const campaigns = all_campaigns;
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

  const [selectedCampaigns, setSelectedCampaigns] = useState(campaigns);

  useEffect(() => {
    if (selectedCategory) {
      setSelectedCampaigns(
        campaigns.filter((campaign) => campaign.category === selectedCategory)
      );
    } else {
      setSelectedCampaigns(campaigns);
    }
  }, [selectedCategory, campaigns]);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4 max-w-5xl">
        <Button
          className={cn('text-xs', null === selectedCategory && 'bg-navy-500')}
          asChild
        >
          <Link href={pathname} className="no-underline">
            All
          </Link>
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
            <Link
              href={`${pathname}?category=${category.name}`}
              className="no-underline"
            >
              {category.icon}
              {category.name}
            </Link>
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-12">
        {selectedCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-navy-800 rounded-xl overflow-hidden"
          >
            <div className="flex flex-row items-center gap-2 p-3 h-full">
              <div className="w-full">
                <DarkShadow className="rounded-lg mb-2">
                  <div className="flex items-center gap-1.5 px-3">
                    <TimerIcon className="text-amber-400" width={16} />
                    <p className="text-white text-xs font-semibold">3d 12h</p>
                  </div>
                </DarkShadow>

                <h2 className="text-white text-sm font-bold mb-1">
                  {campaign.name}
                </h2>

                <p className="text-navy-300 text-xs tracking-wide mb-3 line-clamp-2">
                  {campaign.description}
                </p>

                <DarkShadow className="rounded-lg">
                  <Button size="sm" asChild>
                    <Link href="/campaigns/1" className="no-underline">
                      Learn More
                    </Link>
                  </Button>
                </DarkShadow>
              </div>

              <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={campaign.brand_logo}
                  width={1000}
                  height={1000}
                  alt={campaign.brand}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
