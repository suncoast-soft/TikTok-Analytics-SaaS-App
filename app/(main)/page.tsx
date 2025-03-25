import { PublicLargeCampaignCard } from '@/components/sections/CampaignCard';
import { PublicCampaigns } from '@/components/sections/CampaignListing';
import Welcome from '@/components/sections/Welcome';
import { getCampaigns, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { Suspense } from 'react';

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ category: string }>;
}) {
  const category = (await searchParams).category;

  const supabase = await createClient();
  const user = await getUser(supabase);
  const campaigns = await getCampaigns(supabase);

  return (
    <div className="container max-w-7xl py-8">
      {!category && campaigns.length > 0 && (
        <>
          <h1 className="text-white text-xl lg:text-3xl font-bold text-center my-4">
            Connecting Affiliates with exclusive TikTok Shop Brand deals
          </h1>

          <h2 className="text-amber-400 lg:text-xl font-semibold text-center mb-12">
            Earn higher commissions and cash rewards
          </h2>

          {!user && <Welcome />}

          <PublicLargeCampaignCard campaign={campaigns[0]} />
        </>
      )}

      <Suspense>
        <PublicCampaigns selectedCategory={category} campaigns={campaigns} />
      </Suspense>
    </div>
  );
}
