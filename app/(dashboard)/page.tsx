import DarkShadow from '@/components/modules/DarkShadow';
import GradientOverlay from '@/components/modules/GradientOverlay';
import { TimeLeftBox } from '@/components/modules/TimeLeft';
import Listing from '@/components/sections/Listing';
import Welcome from '@/components/sections/Welcome';
import { Button } from '@/components/ui/button';
import { all_campaigns } from '@/utils/mock';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { TrophyIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Home() {
  const supabase = await createClient();
  const user = await getUser(supabase);

  const featured_campaign = all_campaigns[0];

  return (
    <div className="container max-w-7xl py-8">
      {!user && <Welcome />}

      <div className="bg-navy-800 rounded-xl overflow-hidden mb-12">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-40 px-8 py-6">
            <h3 className="text-amber-400 text-lg font-bold">
              {featured_campaign.brand}
            </h3>

            <h2 className="text-white text-xl font-bold mb-4">
              {featured_campaign.name}
            </h2>

            <DarkShadow>
              <Button variant="secondary" asChild>
                <Link
                  href={`/campaigns/${featured_campaign.id}`}
                  className="no-underline"
                >
                  Learn More
                </Link>
              </Button>

              <TimeLeftBox
                start_date={featured_campaign.start_date}
                end_date={featured_campaign.end_date}
              />
            </DarkShadow>
          </div>

          <div className="relative w-full md:w-1/2 h-40">
            <Image
              src={featured_campaign.brand_logo}
              width={5472}
              height={3648}
              alt="Register"
              className="w-full h-full object-cover"
            />

            <GradientOverlay />

            <div className="absolute top-4 right-4">
              <DarkShadow className="px-5 py-3">
                <TrophyIcon width={16} height={16} className="text-amber-400" />
                <p className="text-xs font-bold">
                  $5,000 <span className="text-navy-300">cash reward</span>
                </p>
              </DarkShadow>
            </div>
          </div>
        </div>
      </div>

      <Suspense>
        <Listing />
      </Suspense>
    </div>
  );
}
