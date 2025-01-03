import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardBreadcrumb from '@/components/modules/DashboardBreadcrumb'
import Sidenav from '@/components/sections/Sidenav'
import {
  HandshakeIcon,
  LayoutDashboardIcon,
  ShoppingBag,
  VideotapeIcon
} from 'lucide-react'
import UserDropdown from '@/components/modules/UserDropdown'
import { getUser } from '@/utils/supabase/queries'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import LogoBlue from '@/components/icons/LogoBlue'

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

  const navs = [
    {
      icon: <LayoutDashboardIcon />,
      name: 'Profile',
      link: `/creator/admin/profile`
    },
    {
      icon: <HandshakeIcon />,
      name: 'Affiliate Orders',
      link: `/creator/admin/orders`
    },
    {
      icon: <ShoppingBag />,
      name: 'Showcase Products',
      link: `/creator/admin/showcases`
    },
    {
      icon: <ShoppingBag />,
      name: 'Sample Fulfillments',
      link: `/creator/admin/samples`
    },
    {
      icon: <VideotapeIcon />,
      name: 'Collaborations',
      subnavs: [
        {
          name: 'Open',
          link: '/creator/admin/collaborations/open'
        },
        {
          name: 'Invited',
          link: '/creator/admin/collaborations/target'
        }
      ]
    }
  ]

  const settings = [
    {
      name: 'Manage Subscription',
      link: '/creator/admin/subscription'
    },
    {
      name: 'Manange Account',
      link: '/creator/admin/account'
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
              <UserDropdown user={user} />
            </div>

            <div className="py-8">{children}</div>
          </div>
        </main>
      </SidebarProvider>
    </main>
  )
}
