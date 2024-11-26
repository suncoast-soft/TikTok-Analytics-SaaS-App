import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardBreadcrumb from '@/components/modules/DashboardBreadcrumb'
import Sidenav from '@/components/modules/Sidenav'
import {
  ClapperboardIcon,
  HandshakeIcon,
  LayoutDashboardIcon,
  ShoppingBag
} from 'lucide-react'
import User from '@/components/modules/User'
import { getUser } from '@/utils/supabase/queries'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import LogoBlue from '@/components/icons/LogoBlue'

export default async function CreatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const user = await getUser(supabase)

  if (!user || user.type !== 'creator') {
    return redirect('/')
  }

  const navs = [
    {
      icon: <LayoutDashboardIcon />,
      name: 'Dashboard',
      link: '/creator/dashboard'
    },
    {
      icon: <ShoppingBag />,
      name: 'Products',
      link: '/creator/products'
    },
    {
      icon: <ClapperboardIcon />,
      name: 'Creators',
      link: '/creator/creators'
    },
    {
      icon: <HandshakeIcon />,
      name: 'Affiliates',
      link: '/creator/affiliates'
    }
  ]

  const settings = [
    {
      name: 'Connect TikTok',
      link: '/creator/auth-tiktok'
    },
    {
      name: 'Manage Subscription',
      link: '/creator/subscription'
    },
    {
      name: 'Manange Account',
      link: '/creator/account'
    }
  ]

  return (
    <main className="flex min-h-screen w-full flex-row bg-orange-50/40">
      <SidebarProvider>
        <Sidenav navs={navs} settings={settings} />

        <main className="w-full overflow-auto">
          <div className="flex md:hidden w-full justify-between p-4 bg-orange-50 shadow">
            <LogoBlue />
            <SidebarTrigger />
          </div>

          <div className="p-2.5">
            <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center rounded-md border">
              <DashboardBreadcrumb />
              <User user={user} />
            </div>

            <div className="py-8">{children}</div>
          </div>
        </main>
      </SidebarProvider>
    </main>
  )
}
