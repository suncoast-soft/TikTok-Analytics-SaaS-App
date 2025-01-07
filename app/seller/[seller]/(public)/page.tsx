import { requestTikTokShopAPIClient } from '@/app/actions'
import SellerCard from '@/components/sections/SellerCard'
import { getUser } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'

const fetchSeller = async (seller: string | undefined) => {
  const data = await requestTikTokShopAPIClient(
    seller,
    '/authorization/202309/shops',
    {},
    'GET',
    ''
  )
  if (data.data && Array.isArray(data.data.shops)) {
    return data.data.shops[0]
  }
  return null
}

export default async function SellerHomePage({
  params
}: {
  params: Promise<{ seller: string }>
}) {
  const supabase = await createClient()
  const user = await getUser(supabase)

  const seller = await fetchSeller((await params).seller)

  return <SellerCard seller={seller} user={user} cta={true} />
}
