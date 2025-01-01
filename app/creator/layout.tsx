import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardBreadcrumb from '@/components/modules/DashboardBreadcrumb'
import Sidenav from '@/components/modules/Sidenav'
import {
  ClapperboardIcon,
  HandshakeIcon,
  LayoutDashboardIcon,
  ShoppingBag,
  VideotapeIcon
} from 'lucide-react'
import User from '@/components/modules/User'
import { getUser } from '@/utils/supabase/queries'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import LogoBlue from '@/components/icons/LogoBlue'
import { cookies } from 'next/headers'

export default async function CreatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const user = await getUser(supabase)

  if (!user || user.type !== 'creator') {
    return redirect('/')
  }

  const cookieStore = await cookies()
  const seller = cookieStore.get('seller')?.value

  const navs = [
    {
      icon: <LayoutDashboardIcon />,
      name: 'Analytics',
      link: seller ? `/creator/sellers/${seller}/analytics` : '/creator/sellers'
    },
    {
      icon: <ShoppingBag />,
      name: 'Products',
      link: seller ? `/creator/sellers/${seller}/products` : '/creator/sellers'
    },
    {
      icon: <VideotapeIcon />,
      name: 'Videos',
      subnavs: [
        {
          name: 'Performance',
          link: seller
            ? `/creator/sellers/${seller}/videos`
            : '/creator/sellers'
        },
        {
          name: 'Details',
          link: seller
            ? `/creator/sellers/${seller}/videos/details`
            : '/creator/sellers'
        }
      ]
    },
    {
      icon: <ClapperboardIcon />,
      name: 'Creators',
      link: seller ? `/creator/sellers/${seller}/creators` : '/creator/sellers'
    },
    {
      icon: <HandshakeIcon />,
      name: 'Affiliates',
      subnavs: [
        {
          name: 'Creator Performance',
          link: seller
            ? `/creator/sellers/${seller}/affiliates/performance`
            : '/creator/sellers'
        },
        {
          name: 'Collaboration Products',
          link: seller
            ? `/creator/sellers/${seller}/affiliates/products`
            : '/creator/sellers'
        }
      ]
    }
  ]

  const settings = [
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
