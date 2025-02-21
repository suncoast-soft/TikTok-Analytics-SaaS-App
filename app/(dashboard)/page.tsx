import { PublicLargeCampaignCard } from '@/components/sections/CampaignCard';
import { PublicCampaigns } from '@/components/sections/CampaignListing';
import Welcome from '@/components/sections/Welcome';
import { all_campaigns } from '@/utils/mock';
import { getUser } from '@/utils/supabase/queries';
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

  return (
    <div className="container max-w-7xl py-8">
      {!category && (
        <>
          {!user && <Welcome />}

          <PublicLargeCampaignCard campaign={all_campaigns[0]} />
        </>
      )}

      <Suspense>
        <PublicCampaigns selectedCategory={category} />
      </Suspense>
    </div>
  );
}
