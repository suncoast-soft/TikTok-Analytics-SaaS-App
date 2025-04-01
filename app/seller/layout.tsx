import Logo from '@/components/icons/Logo';
import Footer from '@/components/sections/Footer';
import Header from '@/components/sections/Header';
import Sidenav from '@/components/sections/Sidenav';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import {
  ActivityIcon,
  CogIcon,
  HandshakeIcon,
  HeadsetIcon,
  LineChartIcon,
  ShoppingBagIcon,
  VideoIcon
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
      name: 'Affiliate Orders',
      link: '/seller/orders'
    },
    {
      icon: <LineChartIcon width={20} height={20} />,
      name: 'Analytics',
      link: '/seller/analytics',
      subnavs: [
        {
          icon: <ActivityIcon width={20} height={20} />,
          name: 'Shop Performance',
          link: '/seller/analytics/shop'
        },
        {
          icon: <VideoIcon width={20} height={20} />,
          name: 'Video Performance',
          link: '/seller/analytics/videos'
        }
      ]
    },
    {
      icon: <CogIcon width={20} height={20} />,
      name: 'Settings',
      link: '/seller/account'
    },
    {
      icon: <HeadsetIcon width={20} height={20} />,
      name: 'Support',
      link: '/seller/support'
    }
  ];

  return (
    <div className="flex min-h-screen w-full flex-row">
      <SidebarProvider>
        <Suspense>
          <Sidenav navs={navs} isSeller={true} />
        </Suspense>

        <main className="w-full h-screen scrollbar-hidden overflow-y-scroll bg-navy-800">
          <div className="flex md:hidden w-full justify-between p-4 shadow">
            <Link href="/seller">
              <Logo type="blue" />
            </Link>
            <SidebarTrigger />
          </div>

          <div className="hidden md:block">
            <Header user={user} />
          </div>

          {children}

          <Footer />
        </main>
      </SidebarProvider>
    </div>
  );
}
