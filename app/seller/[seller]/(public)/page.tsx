import SellerCard from '@/components/sections/SellerCard'
import { getUser } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'

type Params = Promise<{ seller: string }>

export default async function SellerHomePage({ params }: { params: Params }) {
  const supabase = await createClient()
  const user = await getUser(supabase)

  return <SellerCard seller={(await params).seller} user={user} cta={true} />
}
