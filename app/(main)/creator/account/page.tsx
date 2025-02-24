import { requestTikTokAPIClient } from '@/app/actions';
import Box from '@/components/modules/Box';
import Card from '@/components/modules/Card';
import Title from '@/components/modules/Title';
import TikTokCreatorSignin from '@/components/sections/Forms/TikTokCreatorSignin';
import TikTokCreatorSignout from '@/components/sections/Forms/TikTokCreatorSignout';
import { Button } from '@/components/ui/button';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import {
  CaptionsIcon,
  ThumbsUpIcon,
  UserRoundCheckIcon,
  VideoIcon
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Account() {
  const supabase = await createClient();
  const user = await getUser(supabase);

  if (!user) {
    return <Title title="Account Settings" />;
  }

  const tiktokUserData = await requestTikTokAPIClient('user/info', {
    fields:
      'avatar_url,display_name,bio_description,profile_deep_link,username,follower_count,likes_count,video_count'
  });
  const { user: tiktokUser } = tiktokUserData ?? {};

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
            label={'My Tiktok Account'}
            className="mb-3"
          />

          {tiktokUser ? (
            <div>
              <div className="w-fit flex items-center gap-2 mb-4">
                <Image
                  src={tiktokUser.avatar_url}
                  width={32}
                  height={32}
                  alt={tiktokUser.display_name}
                  className="rounded-full"
                />

                <Link href={tiktokUser.profile_deep_link} target="_blank">
                  <span>@{tiktokUser.username}</span>
                </Link>
              </div>

              <div className="flex flex-col xl:flex-row xl:items-center gap-2 mb-4">
                <Box
                  icon={<VideoIcon size={16} />}
                  value={`${tiktokUser.video_count.toLocaleString()}`}
                  label="Videos"
                />
                <Box
                  icon={<UserRoundCheckIcon size={16} />}
                  value={`${tiktokUser.follower_count.toLocaleString()}`}
                  label="Followers"
                />
                <Box
                  icon={<ThumbsUpIcon size={16} />}
                  value={`${tiktokUser.likes_count.toLocaleString()}`}
                  label="Likes"
                />
              </div>

              <TikTokCreatorSignout />
            </div>
          ) : (
            <TikTokCreatorSignin />
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
          <Link href={'/'} className="no-underline">
            Browse More Campaigns
          </Link>
        </Button>

        <Button variant="secondary" asChild>
          <Link href={'/creator/campaigns'} className="no-underline">
            My Campaigns
          </Link>
        </Button>
      </div>
    </div>
  );
}
