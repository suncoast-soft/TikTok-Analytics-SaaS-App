import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function AuthTiktok() {
  return (
    <div>
      <Button asChild>
        <Link
          href={`https://services.tiktokshops.us/open/authorize?service_id=${process.env.NEXT_PUBLIC_TIKTOK_SELLER_SERVICE_ID}`}
          target="_blank"
        >
          Link Your TikTok Seller Account
        </Link>
      </Button>
    </div>
  )
}
