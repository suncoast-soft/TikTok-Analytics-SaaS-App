import DarkShadow from '@/components/modules/DarkShadow';
import { TimeLeftBar, TimeLeftBox } from '@/components/modules/TimeLeft';
import { Button } from '@/components/ui/button';
import { active_campaigns } from '@/utils/mock';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { CircleDollarSignIcon, ShoppingBagIcon, VideoIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function MyCampaigns() {
  const supabase = await createClient();
  const user = await getUser(supabase);

  if (!user) {
    return (
      <h1 className="text-2xl md:text-4xl text-white font-bold text-center mt-4 mb-8">
        Active Campaigns
      </h1>
    );
  }

  return (
    <div className="container max-w-7xl py-8">
      <div className="mb-12 space-y-8">
        {active_campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-navy-800 rounded-xl overflow-hidden"
          >
            <div className="flex flex-row items-center h-full">
              <div className="relative w-1/3 h-72 flex-shrink-0">
                <Image
                  src={campaign.brand_logo}
                  width={1000}
                  height={1000}
                  alt={campaign.brand}
                  className="w-full h-full object-cover"
                />

                <div className="absolute left-4 top-4">
                  <TimeLeftBox
                    start_date={campaign.start_date}
                    end_date={campaign.end_date}
                  />
                </div>
              </div>

              <div className="w-5/12 px-8 py-4">
                <div className="w-fit bg-amber-500 px-2  mt-2 mb-2">
                  <h2 className="text-white font-bold">{campaign.brand}</h2>
                </div>

                <h2 className="text-white text-2xl font-bold mt-2 mb-4">
                  {campaign.name}
                </h2>

                <div className="bg-navy-700 w-full md:w-96 p-3 rounded-lg mb-4">
                  <TimeLeftBar
                    start_date={campaign.start_date}
                    end_date={campaign.end_date}
                  />
                </div>

                <DarkShadow className="rounded-lg">
                  <Button size="sm" asChild>
                    <Link
                      href={`/creator/campaigns/${campaign.id}`}
                      className="no-underline"
                    >
                      View Details
                    </Link>
                  </Button>
                </DarkShadow>
              </div>

              <div className="w-1/4 px-8 py-4">
                <div className="bg-navy-700 w-full md:w-64 p-3 rounded-lg mb-3">
                  <div className="flex flex-row items-center gap-2">
                    <ShoppingBagIcon
                      width={16}
                      height={16}
                      className="text-amber-400"
                    />
                    <p className="text-white text-xs font-semibold">
                      <span className="text-2xl font-bold mr-2">
                        {campaign.progress.orders}
                      </span>
                      Orders
                    </p>
                  </div>
                </div>

                <div className="bg-navy-700 w-full md:w-64 p-3 rounded-lg mb-3">
                  <div className="flex flex-row items-center gap-2">
                    <VideoIcon
                      width={16}
                      height={16}
                      className="text-amber-400"
                    />
                    <p className="text-white text-xs font-semibold">
                      <span className="text-2xl font-bold mr-2">
                        {campaign.progress.videos}
                      </span>
                      Videos
                    </p>
                  </div>
                </div>

                <div className="bg-navy-700 w-full md:w-64 p-3 rounded-lg">
                  <div className="flex flex-row items-center gap-2">
                    <CircleDollarSignIcon
                      width={16}
                      height={16}
                      className="text-amber-400"
                    />
                    <p className="text-white text-xs font-semibold">
                      <span className="text-2xl font-bold mr-2">
                        ${campaign.progress.gmv.toLocaleString()}
                      </span>
                      GMV
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
