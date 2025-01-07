import SellerAnalytics from '@/components/sections/Analytics'

export default async function SellerAnalyticsOverviewPage({
  params
}: {
  params: Promise<{ seller: string }>
}) {
  return <SellerAnalytics seller={(await params).seller} />
}
