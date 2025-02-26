import { EndedLargeCampaignCard } from '@/components/sections/CampaignCard/EndedLargeCampaignCard';
import { completed_campaigns } from '@/utils/mock';

export default async function Earning() {
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
