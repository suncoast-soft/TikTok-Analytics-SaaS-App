import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import DashboardBreadcrumb from '@/components/modules/DashboardBreadcrumb'
import { DesktopNav, MobileNav } from '@/components/modules/Sidenav'
import { ListChecks, PackageSearch } from 'lucide-react'
import User from '@/components/modules/User'
import { getSeller, getSubscription, getUser } from '@/utils/supabase/queries'

export default async function SellerPrivateLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const [subscription, seller] = await Promise.all([
    getSubscription(supabase),
    getSeller(supabase)
  ])

  if (!seller) {
    return redirect('/seller/auth-tiktok')
  }

  return <div>{children}</div>
}
