import Logo from '@/components/icons/Logo';
import Footer from '@/components/sections/Footer';
import Header from '@/components/sections/Header';
import Sidenav from '@/components/sections/Sidenav';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import {
  CogIcon,
  HandshakeIcon,
  HeadsetIcon,
  ShoppingBagIcon
} from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const user = await getUser(supabase);

  const navs = [
    {
      icon: <HandshakeIcon width={20} height={20} />,
      name: 'My Campaigns',
      link: '/seller'
    },
    {
      icon: <ShoppingBagIcon width={20} height={20} />,
      name: 'Affiliate Creators',
      link: '/seller/creators'
    },
    {
      icon: <ShoppingBagIcon width={20} height={20} />,
      name: 'Affiliate Orders',
      link: '/seller/orders'
    },
    {
      icon: <CogIcon width={20} height={20} />,
      name: 'Settings',
      link: '/seller/account'
    },
    {
      icon: <HeadsetIcon width={20} height={20} />,
      name: 'Support',
      link: '/support'
    }
  ];

  return (
    <main className="flex min-h-screen w-full flex-row">
      <SidebarProvider>
        <Suspense>
          <Sidenav navs={navs} />
        </Suspense>

        <main className="w-full overflow-auto">
          <div className="flex md:hidden w-full justify-between p-4 shadow">
            <Link href="/seller" className="no-underline">
              <Logo type="blue" />
            </Link>
            <SidebarTrigger />
          </div>

          <div className="hidden md:block">
            <Header user={user} />
          </div>

          <div className="bg-navy-950 h-[calc(100vh-72px)] scrollbar-hidden overflow-y-scroll rounded-ss-xl">
            <div className="min-h-[calc(100vh-470px)]">{children}</div>
            <Footer />
          </div>
        </main>
      </SidebarProvider>
    </main>
  );
}
