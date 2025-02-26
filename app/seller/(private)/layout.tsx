import Box from '@/components/modules/Box';
import Title from '@/components/modules/Title';
import { Button } from '@/components/ui/button';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function PrivateLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const user = await getUser(supabase);

  if (user?.type === 'seller') {
    return children;
  } else {
    return (
      <div className="container max-w-7xl py-8">
        <Box className="mx-auto my-12 text-center">
          <Title
            tag="h2"
            title="Private Seller Page"
            subtitle="Please log in to access"
          />
        </Box>

        <div className="text-center">
          <Button variant="default" asChild>
            <Link href="/auth/login?type=seller" className="no-underline">
              Seller Login
            </Link>
          </Button>
        </div>
      </div>
    );
  }
}
