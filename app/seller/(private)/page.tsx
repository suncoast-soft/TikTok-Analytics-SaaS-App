import { requestTikTokShopAPIClient } from '@/app/actions';
import { SellerCampaignCard } from '@/components/sections/CampaignCard/SellerCampaignCard';
import { SellerCampaignOverview } from '@/types/tiktok';
import { getSeller } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function SellerCampaigns() {
  const supabase = await createClient();
  const seller = await getSeller(supabase);

  const sellerTargetCollaborationsData = await requestTikTokShopAPIClient(
    '/affiliate_seller/202409/target_collaborations/search',
    {
      page_size: 20
    },
    'POST',
    JSON.stringify({
      collaboration_status: 'VALID'
    })
  );
  const { target_collaborations } = sellerTargetCollaborationsData.data;

  return (
    <div className="container max-w-7xl py-8">
      <div className="mb-12 space-y-8">
        {target_collaborations.map((campaign: SellerCampaignOverview) => (
          <SellerCampaignCard
            key={campaign.id}
            campaign={campaign}
            seller={seller}
          />
        ))}
      </div>
    </div>
  );
}
