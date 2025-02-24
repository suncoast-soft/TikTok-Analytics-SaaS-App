import { Button } from '@/components/ui/button';
import { getUser, getUserData } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function PrivateLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const [user, userData] = await Promise.all([
    getUser(supabase),
    getUserData(supabase)
  ]);

  if (user && userData.type === 'seller') {
    return children;
  } else {
    return (
      <div className="container max-w-7xl py-8">
        {children}

        <div className="mx-auto bg-navy-600 w-fit px-5 py-2 rounded-lg mt-0 mb-12">
          <p className="text-white font-medium text-lg text-center">
            Please log in to access this page.
          </p>
        </div>

        <Button variant="link" className="mx-auto my-2" asChild>
          <Link href="/auth/login?type=seller" className="no-underline">
            Seller Login
          </Link>
        </Button>
      </div>
    );
  }
}
