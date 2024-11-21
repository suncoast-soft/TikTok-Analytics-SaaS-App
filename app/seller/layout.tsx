import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardBreadcrumb from '@/components/modules/DashboardBreadcrumb'
import { DesktopNav, MobileNav } from '@/components/modules/Sidenav'
import { ListChecks, PackageSearch } from 'lucide-react'
import User from '@/components/modules/User'
import { getUser } from '@/utils/supabase/queries'

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
      icon: <PackageSearch />,
      name: 'Dashboard',
      link: '/seller'
    },
    {
      icon: <ListChecks />,
      name: 'search',
      link: '/seller'
    }
  ]

  return (
    <main className="flex min-h-screen w-full flex-row bg-muted/40">
      <DesktopNav navs={navs} />

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-8 w-full">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 px-4">
          <MobileNav navs={navs} />

          <div className="flex flex-row justify-between items-center w-full bg-orange-50/40 px-4 py-2 shadow-md">
            <DashboardBreadcrumb />
            <User user={user} />
          </div>
        </header>

        <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
          {children}
        </main>
      </div>
    </main>
  )
}
