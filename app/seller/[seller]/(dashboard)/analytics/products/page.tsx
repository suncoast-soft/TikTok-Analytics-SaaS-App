import ProductList from '@/components/sections/Products'

export default async function SellerAnalyticsProductsPage({
  params
}: {
  params: Promise<{ seller: string }>
}) {
  return <ProductList seller={(await params).seller} />
}
