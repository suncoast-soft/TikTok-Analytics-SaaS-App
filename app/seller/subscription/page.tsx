import StripePricingTable from '@/components/stripe/StripeTable'
import { getUser } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'

export default async function AuthTiktok() {
  const supabase = createClient()
  const user = await getUser(supabase)

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Pricing Plan</h2>
      <p className="text-center max-w-2xl mx-auto mb-12">
        Transparent & Competitive. Stay tuned for our upcoming pricing models
        that promise value and transparency.
      </p>

      <StripePricingTable user={user} />
    </div>
  )
}
