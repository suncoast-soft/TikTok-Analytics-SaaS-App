import { ActiveLargeCampaignCard } from '@/components/sections/CampaignCard';
import { getCampaigns } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function MyCampaigns() {
  const supabase = await createClient();
  const campaigns = await getCampaigns(supabase);

  return (
    <div className="container max-w-7xl py-8">
      <div className="mb-12 space-y-8">
        {campaigns.map((campaign) => (
          <ActiveLargeCampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}
