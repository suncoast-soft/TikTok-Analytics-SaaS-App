import DarkShadow from '@/components/modules/DarkShadow';
import GradientOverlay from '@/components/modules/GradientOverlay';
import Separator from '@/components/modules/Separator';
import { TimeLeftBox } from '@/components/modules/TimeLeft';
import OauthSignIn from '@/components/sections/Forms/OauthSignIn';
import Listing from '@/components/sections/Listing';
import { Button } from '@/components/ui/button';
import { all_campaigns } from '@/utils/mock';
import { TrophyIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const featured_campaign = all_campaigns[0];

  return (
    <div className="container max-w-7xl py-8">
      <div className="bg-navy-800 rounded-xl overflow-hidden mb-12">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 lg:w-2/3 h-80 bg-navy-950">
            <Image
              src="/landing/analytics-2.jpg"
              width={5472}
              height={3648}
              alt="Register"
              className="w-full h-full object-cover opacity-60"
            />
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 h-80 px-8 py-6 flex flex-col justify-center items-center gap-3">
            <h1 className="text-white text-2xl font-bold text-center">
              Welcome to Flicker
            </h1>

            <Button variant="link" className="my-2" asChild>
              <Link href="/login" className="no-underline">
                Login
              </Link>
            </Button>

            <Button variant="secondary" className="w-full" asChild>
              <Link href="/register" className="no-underline">
                Register
              </Link>
            </Button>

            <div className="w-full">
              <Separator text="Or continue with" />
              <OauthSignIn />
            </div>
          </div>
        </div>
      </div>

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

      <Listing />
    </div>
  );
}
