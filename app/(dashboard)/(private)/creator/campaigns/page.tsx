import Listing from '@/components/sections/Listing';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { Suspense } from 'react';

export default async function MyCampaigns() {
  const supabase = await createClient();
  const user = await getUser(supabase);

  if (!user) {
    return (
      <h1 className="text-2xl md:text-4xl text-white font-bold text-center mt-4 mb-8">
        My Campaigns
      </h1>
    );
  }

  return (
    <div className="container max-w-7xl py-8">
      <Suspense>
        <Listing />
      </Suspense>
    </div>
  );
}
