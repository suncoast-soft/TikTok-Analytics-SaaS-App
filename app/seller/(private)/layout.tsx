import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getSeller, getSubscription } from '@/utils/supabase/queries'

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

  if (!subscription) {
    return redirect('/seller/subscription')
  }

  return children
}
