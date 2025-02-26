import Box from '@/components/modules/Box';
import Title from '@/components/modules/Title';
import Welcome from '@/components/sections/Welcome';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function PrivateLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const user = await getUser(supabase);

  if (user?.type === 'creator') {
    return children;
  } else {
    return (
      <div className="container max-w-7xl py-8">
        <Box className="mx-auto my-12 text-center">
          <Title
            tag="h2"
            title="Private Creator Page"
            subtitle="Please log in to access"
          />
        </Box>

        <Welcome />
      </div>
    );
  }
}
