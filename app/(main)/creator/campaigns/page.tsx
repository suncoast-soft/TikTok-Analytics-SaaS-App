import { ActiveLargeCampaignCard } from '@/components/sections/CampaignCard';
import { active_campaigns } from '@/utils/mock';

export default async function MyCampaigns() {
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
