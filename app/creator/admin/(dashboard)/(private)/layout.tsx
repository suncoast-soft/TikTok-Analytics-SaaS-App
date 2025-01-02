import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getSubscription } from '@/utils/supabase/queries'

export default async function SellerPrivateLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const [subscription] = await Promise.all([getSubscription(supabase)])

  if (!subscription) {
    return redirect('/creator/subscription')
  }

  return children
}
