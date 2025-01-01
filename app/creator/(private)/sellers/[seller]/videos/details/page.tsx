import SellerVideosDetail from '@/components/sections/VideosDetail'
import { cookies } from 'next/headers'

export default async function VideosDetailPage() {
  const cookieStore = await cookies()
  const seller = cookieStore.get('seller')?.value

  return <SellerVideosDetail sellerId={seller} />
}
