import { SellerCampaignCard } from '@/components/sections/CampaignCard/SellerCampaignCard';
import { getCampaigns, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function SellerCampaigns() {
  const supabase = await createClient();
  const user = await getUser(supabase);
  const campaigns = await getCampaigns(supabase);

  return (
    <div className="container max-w-7xl py-8">
      <div className="mb-12 space-y-8">
        {campaigns.map((campaign) => (
          <SellerCampaignCard
            key={campaign.id}
            campaign={campaign}
            seller={user}
          />
        ))}
      </div>
    </div>
  );
}
