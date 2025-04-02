import Box from '@/components/modules/Box';
import Title from '@/components/modules/Title';
import TikTokCreatorSignin from '@/components/sections/Forms/TikTokCreatorSignin';
import Welcome from '@/components/sections/Welcome';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { LinkIcon } from 'lucide-react';

export default async function PrivateLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const user = await getUser(supabase);

  if (user?.type === 'creator') {
    if (user.access_token) {
      return children;
    } else {
      return (
        <>
          <div className="container max-w-6xl py-20">
            <Box
              icon={<LinkIcon size={16} />}
              label="Tiktok Creator"
              className="mx-auto p-5"
            >
              <Title
                tag="h3"
                title="Please Authorize Your Tiktok Account"
                className="mb-6"
              />
              <TikTokCreatorSignin />
            </Box>
          </div>
        </>
      );
    }
  } else {
    return (
      <div className="container max-w-6xl py-8">
        <Box className="mx-auto my-12 text-center">
          <Title tag="h3" title="Private Creator Page" />
          <Title title="Please log in to access" />
        </Box>

        <Welcome />
      </div>
    );
  }
}
