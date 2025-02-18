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

  if (!user) {
    return (
      <div className="container max-w-7xl py-8">
        {children}

        <div className="mx-auto bg-navy-600 w-fit px-5 py-2 rounded-lg mt-0 mb-12">
          <p className="text-white font-medium text-lg text-center">
            Please log in to access this page.
          </p>
        </div>

        <Welcome />
      </div>
    );
  }

  return children;
}
