import SellerVideosDetail from '@/components/sections/VideosDetail'

export default async function SellerAnalyticsVideosPage({
  params
}: {
  params: Promise<{ seller: string }>
}) {
  return <SellerVideosDetail seller={(await params).seller} />
}
