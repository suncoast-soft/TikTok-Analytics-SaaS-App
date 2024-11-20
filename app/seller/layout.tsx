import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardBreadcrumb from '@/components/modules/DashboardBreadcrumb'
import { DesktopNav, MobileNav } from '@/components/modules/Sidenav'
import { ListChecks, PackageSearch } from 'lucide-react'
import User from '@/components/modules/User'
import { getSubscription, getUserData } from '@/utils/supabase/queries'
import { getErrorRedirect } from '@/utils/helpers'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/seller')
  }

  const [userData, subscription] = await Promise.all([
    getUserData(supabase),
    getSubscription(supabase)
  ])

  if (!userData) {
    return getErrorRedirect(
      '/seller',
      'Hmm... Something went wrong.',
      'Your account information appears to be incorrect. Please try again or contact customer support.'
    )
  }

  if (!userData.type || !subscription) {
    return redirect('/account')
  }

  /**
   * Dashboard Menu Config
   */
  const navs = [
    {
      icon: <PackageSearch />,
      name: 'Dashboard',
      link: userData.type === 'seller' ? '/seller' : '/creator'
    },
    {
      icon: <ListChecks />,
      name: 'search',
      link: userData.type === 'seller' ? '/seller' : '/creator'
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
