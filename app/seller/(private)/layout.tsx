import Box from '@/components/modules/Box';
import Title from '@/components/modules/Title';
import TikTokSellerSignin from '@/components/sections/Forms/TikTokSellerSignin';
import { Button } from '@/components/ui/button';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { LinkIcon } from 'lucide-react';
import Link from 'next/link';

export default async function PrivateLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const user = await getUser(supabase);

  if (user?.type === 'seller') {
    if (user.access_token) {
      return children;
    } else {
      return (
        <>
          <div className="container max-w-6xl py-20">
            <Box
              icon={<LinkIcon size={16} />}
              label="Tiktok Seller"
              className="mx-auto p-5"
            >
              <Title
                tag="h3"
                title="Please Authorize Your Tiktok Seller Account"
                className="mb-6"
              />
              <TikTokSellerSignin />
            </Box>
          </div>
        </>
      );
    }
  } else {
    return (
      <div className="container max-w-6xl py-8">
        <Box className="mx-auto my-12 text-center">
          <Title
            tag="h2"
            title="Private Seller Page"
            subtitle="Please log in to access"
          />
        </Box>

        <div className="text-center">
          <Button variant="default" asChild>
            <Link href="/auth/login?type=seller">Seller Login</Link>
          </Button>
        </div>
      </div>
    );
  }
}
