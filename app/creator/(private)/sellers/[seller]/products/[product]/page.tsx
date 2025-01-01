import Product from '@/components/modules/SellerHome/Product'
import { cookies } from 'next/headers'

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ product: string }>
}) {
  const productId = (await params).product

  const cookieStore = await cookies()
  const seller = cookieStore.get('seller')?.value

  return <Product id={productId} sellerId={seller} />
}
