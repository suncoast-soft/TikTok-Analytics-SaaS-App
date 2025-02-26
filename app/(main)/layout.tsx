import Logo from '@/components/icons/Logo';
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
      link: '/',
      subnavs: [
        {
          icon: <ShirtIcon width={20} height={20} />,
          name: 'Fashion and Beauty',
          link: '/?category=Fashion+and+Beauty'
        },
        {
          icon: <DumbbellIcon width={20} height={20} />,
          name: 'Fitness and Wellness',
          link: '/?category=Fitness+and+Wellness'
        },
        {
          icon: <LaptopIcon width={20} height={20} />,
          name: 'Technology and Gadgets',
          link: '/?category=Technology+and+Gadgets'
        },
        {
          icon: <HomeIcon width={20} height={20} />,
          name: 'Lifestyle and Home',
          link: '/?category=Lifestyle+and+Home'
        },
        {
          icon: <UtensilsIcon width={20} height={20} />,
          name: 'Food and Beverage',
          link: '/?category=Food+and+Beverage'
        },
        {
          icon: <PlaneIcon width={20} height={20} />,
          name: 'Travel and Experiences',
          link: '/?category=Travel+and+Experiences'
        },
        {
          icon: <BoxesIcon width={20} height={20} />,
          name: 'Others',
          link: '/?category=Others'
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
          name: 'Affiliate Analytics',
          link: '/creator/analytics/affiliate'
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
    <main className="flex min-h-screen w-full flex-row">
      <SidebarProvider>
        <Suspense>
          <Sidenav navs={navs} isSeller={false} />
        </Suspense>

        <main className="w-full overflow-auto">
          <div className="flex md:hidden w-full justify-between p-4 shadow">
            <Link href="/">
              <Logo type="white" />
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
