import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getSeller } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'
import { format } from 'date-fns'
import Link from 'next/link'

export default async function AuthTiktok() {
  const supabase = createClient()
  const seller = await getSeller(supabase)

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Manage Account Settings
      </h2>

      <div className="text-center">
        {seller && (
          <Card className="max-w-md mx-auto mb-8 text-left">
            <CardHeader>
              <h3 className="text-xl font-semibold">Connection Details</h3>
            </CardHeader>
            <CardContent>
              <h4 className="font-medium">
                Seller Name:{' '}
                <span className="text-primary">{seller.seller_name}</span>
              </h4>
              <h4 className="font-medium">
                Connected at:{' '}
                <span className="text-primary">
                  {format(seller.created_at, 'PPP')}
                </span>
              </h4>
            </CardContent>
          </Card>
        )}
        <Button asChild>
          <Link
            href={`https://services.tiktokshops.us/open/authorize?service_id=${process.env.NEXT_PUBLIC_TIKTOK_SELLER_SERVICE_ID}`}
          >
            {seller
              ? 'Re-authorize your TikTok Seller Account'
              : 'Authorize TikTok Seller Account'}
          </Link>
        </Button>
      </div>
    </div>
  )
}
