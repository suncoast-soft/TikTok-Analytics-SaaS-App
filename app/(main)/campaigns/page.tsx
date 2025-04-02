import { PublicCampaigns } from '@/components/sections/CampaignListing';
import { getCampaigns } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { Suspense } from 'react';

export default async function Campaigns({
  searchParams
}: {
  searchParams: Promise<{ category: string }>;
}) {
  const category = (await searchParams).category;

  const supabase = await createClient();
  const campaigns = await getCampaigns(supabase);

  return (
    <div className="container max-w-6xl py-8">
      <Suspense>
        <PublicCampaigns selectedCategory={category} campaigns={campaigns} />
      </Suspense>
    </div>
  );
}
