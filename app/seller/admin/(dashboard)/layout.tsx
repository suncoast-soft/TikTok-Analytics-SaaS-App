import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardBreadcrumb from '@/components/modules/DashboardBreadcrumb'
import Sidenav from '@/components/sections/Sidenav'
import {
  ClapperboardIcon,
  HandshakeIcon,
  LayoutDashboardIcon,
  ShoppingBag
} from 'lucide-react'
import User from '@/components/modules/UserDropdown'
import { getUser } from '@/utils/supabase/queries'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import LogoBlue from '@/components/icons/LogoBlue'

export default async function SellerLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const user = await getUser(supabase)

  if (!user || user.type !== 'seller') {
    return redirect('/')
  }

  const navs = [
    {
      icon: <LayoutDashboardIcon />,
      name: 'Analytics',
      link: '/seller/admin/analytics'
    },
    {
      icon: <ShoppingBag />,
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
  ]

  const settings = [
    {
      name: 'Connect TikTok Seller',
      link: '/seller/admin/link-tiktok-seller'
    },
    {
      name: 'Manange Account',
      link: '/seller/admin/account'
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
