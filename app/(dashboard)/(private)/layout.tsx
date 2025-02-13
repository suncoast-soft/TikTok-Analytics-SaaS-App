import Separator from '@/components/modules/Separator';
import OauthSignIn from '@/components/sections/Forms/OauthSignIn';
import { Button } from '@/components/ui/button';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';

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

        <div className="bg-navy-800 rounded-xl overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 lg:w-2/3 h-80 bg-navy-950">
              <Image
                src="/landing/analytics-2.jpg"
                width={5472}
                height={3648}
                alt="Register"
                className="w-full h-full object-cover opacity-60"
              />
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 h-80 px-8 py-6 flex flex-col justify-center items-center gap-3">
              <h1 className="text-white text-2xl font-bold text-center">
                Welcome to Flicker
              </h1>

              <Button variant="link" className="my-2" asChild>
                <Link href="/login" className="no-underline">
                  Login
                </Link>
              </Button>

              <Button variant="secondary" className="w-full" asChild>
                <Link href="/register" className="no-underline">
                  Register
                </Link>
              </Button>

              <div className="w-full">
                <Separator text="Or continue with" />
                <OauthSignIn />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
