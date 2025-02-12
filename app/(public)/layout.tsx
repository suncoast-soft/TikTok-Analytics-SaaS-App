import Logo from '@/components/icons/Logo';
import Header from '@/components/sections/Header';
import Sidenav from '@/components/sections/Sidenav';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {
  ClapperboardIcon,
  HandshakeIcon,
  LayoutDashboardIcon,
  ShoppingBagIcon
} from 'lucide-react';

export default function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navs = [
    {
      icon: <LayoutDashboardIcon />,
      name: 'Analytics',
      link: '/seller/admin/analytics'
    },
    {
      icon: <ShoppingBagIcon />,
      name: 'Products',
      link: '/seller/admin/products'
    },
    {
      icon: <ClapperboardIcon />,
      name: 'Creators',
      link: '/seller/admin/creators'
    },
    {
      icon: <HandshakeIcon />,
      name: 'Affiliates',
      link: '/seller/admin/affiliates'
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
        <Sidenav navs={navs} settings={settings} />

        <main className="w-full overflow-auto">
          <div className="flex md:hidden w-full justify-between p-4 shadow">
            <Logo type="blue" />
            <SidebarTrigger />
          </div>

          <div className="p-2.5">
            <Header />
            {children}
          </div>
        </main>
      </SidebarProvider>
    </main>
  );
}
