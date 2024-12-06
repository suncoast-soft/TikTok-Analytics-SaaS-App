import SellerProducts from '@/components/modules/Seller/Products'
import { cookies } from 'next/headers'

export default async function ProductsPage() {
  const cookieStore = await cookies()
  const seller = cookieStore.get('seller')?.value
  return <SellerProducts sellerId={seller} />
}
