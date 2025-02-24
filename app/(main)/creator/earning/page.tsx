import Title from '@/components/modules/Title';
import { EndedLargeCampaignCard } from '@/components/sections/CampaignCard/EndedLargeCampaignCard';
import { completed_campaigns } from '@/utils/mock';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function Earning() {
  const supabase = await createClient();
  const user = await getUser(supabase);

  if (!user) {
    return <Title title="Active Campaigns" />;
  }

  return (
    <div className="container max-w-7xl py-8">
      <div className="mb-12 space-y-8">
        {completed_campaigns.map((campaign) => (
          <EndedLargeCampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}
