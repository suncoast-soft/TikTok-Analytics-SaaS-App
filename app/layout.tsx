import { Metadata } from 'next';
import Footer from '@/components/modules/Footer';
import Navbar from '@/components/modules/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { PropsWithChildren, Suspense } from 'react';
import { getURL } from '@/utils/helpers';
import { createClient } from '@/utils/supabase/server';
import 'styles/main.css';

const title = 'Flicker | TikTok Shop Analytics Tool';
const description = 'Join Affiliate Reward Campaigns for TikTok Shop Brands';

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description
  }
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body>
        {!user && <Navbar />}

        <main
          id="skip"
          className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
        >
          {children}
        </main>

        {!user && <Footer />}

        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
