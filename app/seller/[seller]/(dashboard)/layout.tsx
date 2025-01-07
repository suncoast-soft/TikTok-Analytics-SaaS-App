import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardBreadcrumb from '@/components/modules/DashboardBreadcrumb'
import Sidenav from '@/components/sections/Sidenav'
import { HandshakeIcon, LayoutDashboardIcon } from 'lucide-react'
import UserDropdown from '@/components/modules/UserDropdown'
import { getUser } from '@/utils/supabase/queries'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import LogoBlue from '@/components/icons/LogoBlue'

type Params = Promise<{ seller: string }>

export default async function SellerLayout({
  params,
  children
}: {
  params: Params
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const user = await getUser(supabase)

  const seller = (await params).seller

  if (!user || user.type !== 'creator') {
    return redirect('/')
  }

  const navs = [
    {
      icon: <HandshakeIcon />,
      name: 'Campaigns',
      subnavs: [
        {
          name: 'Active Campaigns',
          link: `/seller/${seller}/campaigns/active`
        },
        {
          name: 'Showcase Products',
          link: `/seller/${seller}/campaigns/showcase`
        },
        {
          name: 'Completed',
          link: `/seller/${seller}/campaigns/completed`
        },
        {
          name: 'Open Collaborations',
          link: `/seller/${seller}/campaigns/open`
        }
      ]
    },
    {
      icon: <LayoutDashboardIcon />,
      name: 'Analytics',
      subnavs: [
        {
          name: 'Overview',
          link: `/seller/${seller}/analytics/overview`
        },
        {
          name: 'Top Performing Videos',
          link: `/seller/${seller}/analytics/videos`
        },
        {
          name: 'Products',
          link: `/seller/${seller}/analytics/products`
        },
        {
          name: 'Other Creators',
          link: `/seller/${seller}/analytics/creators`
        }
      ]
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
        <Sidenav navs={navs} settings={settings} label={seller} />

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
