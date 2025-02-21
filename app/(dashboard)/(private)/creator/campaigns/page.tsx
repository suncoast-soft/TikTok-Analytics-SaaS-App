import { ActiveLargeCampaignCard } from '@/components/sections/CampaignCard';
import { active_campaigns } from '@/utils/mock';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

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
          <ActiveLargeCampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}
