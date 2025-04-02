import Logo from '@/components/icons/Logo';
import PulseEffect from '@/components/modules/PulseEffect';
import Footer from '@/components/sections/Footer';
import Header from '@/components/sections/Header';
import Sidenav from '@/components/sections/Sidenav';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import {
  ActivityIcon,
  BoxesIcon,
  DumbbellIcon,
  FolderIcon,
  HandCoinsIcon,
  HandshakeIcon,
  HeadsetIcon,
  HomeIcon,
  LaptopIcon,
  LineChartIcon,
  PlaneIcon,
  ShirtIcon,
  UtensilsIcon,
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
      name: 'Marketplace',
      link: '/campaigns',
      subnavs: [
        {
          icon: <ShirtIcon width={20} height={20} />,
          name: 'Fashion and Beauty',
          link: '/campaigns?category=Fashion+and+Beauty'
        },
        {
          icon: <DumbbellIcon width={20} height={20} />,
          name: 'Fitness and Wellness',
          link: '/campaigns?category=Fitness+and+Wellness'
        },
        {
          icon: <LaptopIcon width={20} height={20} />,
          name: 'Technology and Gadgets',
          link: '/campaigns?category=Technology+and+Gadgets'
        },
        {
          icon: <HomeIcon width={20} height={20} />,
          name: 'Lifestyle and Home',
          link: '/campaigns?category=Lifestyle+and+Home'
        },
        {
          icon: <UtensilsIcon width={20} height={20} />,
          name: 'Food and Beverage',
          link: '/campaigns?category=Food+and+Beverage'
        },
        {
          icon: <PlaneIcon width={20} height={20} />,
          name: 'Travel and Experiences',
          link: '/campaigns?category=Travel+and+Experiences'
        },
        {
          icon: <BoxesIcon width={20} height={20} />,
          name: 'Others',
          link: '/campaigns?category=Others'
        }
      ]
    },
    {
      icon: <FolderIcon width={20} height={20} />,
      name: 'My Campaigns',
      link: '/creator/campaigns'
    },
    {
      icon: <HandCoinsIcon width={20} height={20} />,
      name: 'My Earnings',
      link: '/creator/earning'
    },
    {
      icon: <LineChartIcon width={20} height={20} />,
      name: 'Analytics',
      link: '/creator/analytics',
      subnavs: [
        {
          icon: <VideoIcon width={20} height={20} />,
          name: 'My Top Videos',
          link: '/creator/analytics/videos'
        },
        {
          icon: <ActivityIcon width={20} height={20} />,
          name: 'Affiliate Orders',
          link: '/creator/analytics/orders'
        }
      ]
    },
    {
      icon: <HeadsetIcon width={20} height={20} />,
      name: 'Support',
      link: '/support'
    }
  ];

  return (
    <div className="flex min-h-screen w-full flex-row">
      <SidebarProvider>
        <Suspense>
          <Sidenav navs={navs} isSeller={false} />
        </Suspense>

        <main className="relative w-full h-screen scrollbar-hidden overflow-y-scroll bg-navy-800">
          <div className="flex md:hidden w-full justify-between p-4 shadow z-10 relative">
            <Link href="/">
              <Logo type="white" />
            </Link>
            <SidebarTrigger />
          </div>

          <div className="hidden md:block z-10 relative">
            <Header user={user} />
          </div>

          <div className="z-10 relative">{children}</div>

          <Footer />

          <PulseEffect />
        </main>
      </SidebarProvider>
    </div>
  );
}
