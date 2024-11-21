import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardBreadcrumb from '@/components/modules/DashboardBreadcrumb'
import Sidenav from '@/components/modules/Sidenav'
import {
  ChevronUpIcon,
  ClapperboardIcon,
  HandshakeIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  ShoppingBag
} from 'lucide-react'
import User from '@/components/modules/User'
import { getUser } from '@/utils/supabase/queries'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import Link from 'next/link'
import LogoBlack from '@/components/icons/LogoBlack'
import LogoBlue from '@/components/icons/LogoBlue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export default async function SellerLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const user = await getUser(supabase)

  if (!user || user.type !== 'seller') {
    return redirect('/')
  }

  /**
   * Dashboard Menu Config
   */
  const navs = [
    {
      icon: <LayoutDashboardIcon />,
      name: 'Dashboard',
      link: '/seller/dashboard'
    },
    {
      icon: <ShoppingBag />,
      name: 'Products',
      link: '/seller/products'
    },
    {
      icon: <ClapperboardIcon />,
      name: 'Creators',
      link: '/seller/creators'
    },
    {
      icon: <HandshakeIcon />,
      name: 'Affiliates',
      link: '/seller/affiliates'
    }
  ]

  const settings = [
    {
      name: 'Connect TikTok',
      link: '/seller/auth-tiktok'
    },
    {
      name: 'Manage Subscription',
      link: '/seller/subscription'
    },
    {
      name: 'Manange Account',
      link: '/seller/account'
    }
  ]

  return (
    <main className="flex min-h-screen w-full flex-row bg-muted/40">
      <SidebarProvider>
        <Sidebar variant="floating">
          <SidebarHeader className="border-b mb-3">
            <Link
              href="/"
              className="cursor-pointer rounded-full transform duration-100 ease-in-out no-underline p-4"
              aria-label="Logo"
            >
              <LogoBlack />
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <Sidenav navs={navs} />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton size="lg" className="sm:text-base">
                      <span className="w-5 h-5 mr-2">
                        <SettingsIcon />
                      </span>
                      <span>Settings</span>
                      <ChevronUpIcon className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    className="w-[--radix-popper-anchor-width]"
                  >
                    {settings.map((nav) => (
                      <DropdownMenuItem key={nav.name}>
                        <Link href={nav.link} className="no-underline">
                          {nav.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="w-full">
          <div className="flex md:hidden w-full justify-between p-4 bg-orange-50 shadow">
            <LogoBlue />
            <SidebarTrigger />
          </div>

          <div className="p-2.5">
            <div className="bg-orange-50 shadow px-4 py-3 flex justify-between items-center rounded-md border">
              <DashboardBreadcrumb />
              <User user={user} />
            </div>

            <div className="container py-12">{children}</div>
          </div>
        </main>
      </SidebarProvider>
    </main>
  )
}
