import Logo from '@/components/icons/Logo';
import Header from '@/components/sections/Header';
import Sidenav from '@/components/sections/Sidenav';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
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

export default function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navs = [
    {
      icon: <HandshakeIcon width={20} height={20} />,
      name: 'Marketplace',
      link: '/campaigns',
      subnavs: [
        {
          icon: <ShirtIcon width={20} height={20} />,
          name: 'Fashion and Beauty',
          link: '/campaigns?category=fashion'
        },
        {
          icon: <DumbbellIcon width={20} height={20} />,
          name: 'Fitness and Wellness',
          link: '/campaigns?category=fitness'
        },
        {
          icon: <LaptopIcon width={20} height={20} />,
          name: 'Technology and Gadgets',
          link: '/campaigns?category=technology'
        },
        {
          icon: <HomeIcon width={20} height={20} />,
          name: 'Lifestyle and Home',
          link: '/campaigns?category=lifestyle'
        },
        {
          icon: <UtensilsIcon width={20} height={20} />,
          name: 'Food and Beverage',
          link: '/campaigns?category=food'
        },
        {
          icon: <PlaneIcon width={20} height={20} />,
          name: 'Travel and Experiences',
          link: '/campaigns?category=travel'
        },
        {
          icon: <BoxesIcon width={20} height={20} />,
          name: 'Others',
          link: '/campaigns?category=other'
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
      name: 'Live Support',
      link: '/support'
    }
  ];

  const settings = [
    {
      name: 'Connect TikTok Seller',
      link: '/seller/admin/link-tiktok-seller'
    },
    {
      name: 'Manange Account',
      link: '/seller/admin/account'
    }
  ];

  return (
    <main className="flex min-h-screen w-full flex-row">
      <SidebarProvider>
        <Suspense>
          <Sidenav navs={navs} settings={settings} />
        </Suspense>

        <main className="w-full overflow-auto">
          <div className="flex md:hidden w-full justify-between p-4 shadow">
            <Link href="/" className="no-underline">
              <Logo type="white" />
            </Link>
            <SidebarTrigger />
          </div>

          <div className="hidden md:block">
            <Header />
          </div>

          <div className="bg-navy-950 h-[calc(100vh-72px)] scrollbar-hidden overflow-y-scroll rounded-ss-xl">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </main>
  );
}
