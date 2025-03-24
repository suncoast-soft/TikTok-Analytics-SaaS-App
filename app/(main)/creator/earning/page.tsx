import { EndedLargeCampaignCard } from '@/components/sections/CampaignCard/EndedLargeCampaignCard';
import { getCampaigns } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function Earning() {
  const supabase = await createClient();
  const campaigns = await getCampaigns(supabase);

  return (
    <div className="container max-w-7xl py-8">
      <div className="mb-12 space-y-8">
        {campaigns.map((campaign) => (
          <EndedLargeCampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}
