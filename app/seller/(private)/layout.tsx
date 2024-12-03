import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getSeller } from '@/utils/supabase/queries'

export default async function SellerPrivateLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const [seller] = await Promise.all([getSeller(supabase)])

  if (!seller) {
    return redirect('/seller/auth-tiktok')
  }

  return children
}
