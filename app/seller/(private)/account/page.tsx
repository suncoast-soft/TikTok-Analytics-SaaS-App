import { requestTikTokShopAPIClient } from '@/app/actions';
import Box from '@/components/modules/Box';
import Card from '@/components/modules/Card';
import TikTokSellerSignin from '@/components/sections/Forms/TikTokSellerSignin';
import { Button } from '@/components/ui/button';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { CaptionsIcon } from 'lucide-react';
import Link from 'next/link';

export default async function Account() {
  const supabase = await createClient();
  const user = await getUser(supabase);

  const tiktokSellerData = await requestTikTokShopAPIClient(
    '/authorization/202309/shops',
    {},
    'GET',
    ''
  );
  const shop = tiktokSellerData.data.shops.find(
    (s: { name: string }) => s.name === user.seller_name
  );

  return (
    <div className="container max-w-7xl py-8">
      <div className="grid lg:grid-cols-2 gap-8 mb-20">
        <Card className="p-8" vertical={true}>
          <Box
            icon={<CaptionsIcon size={16} />}
            label={'My Flicker Account'}
            className="mb-3"
          />

          <div className="max-w-xs grid grid-cols-2 gap-y-2">
            <span className="text-sm mr-2">Account Type:</span>
            <span className="text-white font-semibold capitalize">
              Shop Seller
            </span>

            <span className="text-sm mr-2">Email:</span>
            <span className="text-white font-semibold">
              {user.user_metadata.email}
            </span>

            <span className="text-sm mr-2">Email Verified:</span>
            <span className="text-white font-semibold">
              {user.user_metadata.email_verified ? 'Yes' : 'No'}
            </span>

            <span className="text-sm mr-2">Name:</span>
            <span className="text-white font-semibold">
              {user.user_metadata.full_name}
            </span>

            <span className="text-sm mr-2">Login Method:</span>
            <span className="text-white font-semibold capitalize">
              {user.app_metadata.provider}
            </span>
          </div>
        </Card>

        <Card className="p-8" vertical={true}>
          <Box
            icon={<CaptionsIcon size={16} />}
            label={'Tiktok Seller Account'}
            className="mb-3"
          />

          {shop ? (
            <div className="max-w-xs grid grid-cols-2 gap-y-2">
              <span className="text-sm mr-2">Code:</span>
              <span className="text-white font-semibold capitalize">
                {shop.code}
              </span>

              <span className="text-sm mr-2">Shop Name:</span>
              <span className="text-white font-semibold capitalize">
                {shop.name}
              </span>

              <span className="text-sm mr-2">Region:</span>
              <span className="text-white font-semibold capitalize">
                {shop.region}
              </span>

              <span className="text-sm mr-2">Seller Type:</span>
              <span className="text-white font-semibold capitalize">
                {shop.seller_type}
              </span>
            </div>
          ) : (
            <TikTokSellerSignin />
          )}
        </Card>
      </div>

      <h1 className="text-white text-xl lg:text-3xl font-bold text-center my-4">
        Connecting Affiliates with exclusive TikTok Shop Brand deals
      </h1>

      <h2 className="text-amber-400 lg:text-xl font-semibold text-center mb-12">
        Earn higher commissions and cash rewards
      </h2>

      <div className="flex flex-col lg:flex-row justify-center gap-8">
        <Button asChild>
          <Link href={'/seller'}>My Campaigns</Link>
        </Button>

        <Button variant="secondary" asChild>
          <Link href={'/seller/orders'}>View Affiliate Orders</Link>
        </Button>
      </div>
    </div>
  );
}
