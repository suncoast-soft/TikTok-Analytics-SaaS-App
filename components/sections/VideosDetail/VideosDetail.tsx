'use client'

import { requestTikTokShopAPIClient } from '@/app/actions'
import { formatDate, subDays } from 'date-fns'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import Loading from '@/components/modules/Loading'
import DatePickerWithRange from '@/components/modules/DateRange'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import VideoRow from './VideoRow'

interface APIParams {
  [key: string]: string | number
}

const fetchVideoPerformanceList = async (params: APIParams) => {
  const data = await requestTikTokShopAPIClient(
    '/analytics/202409/shop_videos/performance',
    params,
    'GET',
    ''
  )

  return data?.data
}

export default function SellerVideosDetail({
  sellerId
}: {
  sellerId?: string
}) {
  const [videos, setVideos] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 8),
    to: subDays(new Date(), 1)
  })

  const loadInitialData = async () => {
    setIsLoading(true)

    const videosData = await fetchVideoPerformanceList({
      start_date_ge: formatDate(date?.from!, 'yyyy-MM-dd'),
      end_date_lt: formatDate(date?.to!, 'yyyy-MM-dd')
    })

    setVideos(videosData?.videos || [])
    setIsLoading(false)
  }

  useEffect(() => {
    loadInitialData()
  }, [date])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-between px-4">
        <h1 className="text-3xl font-bold mb-4">Video Details</h1>
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>

      <div className="mt-4">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="bg-white shadow-sm rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Video</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>GMV</TableHead>
                  <TableHead>SKU Orders</TableHead>
                  <TableHead>Items Sold</TableHead>
                  <TableHead>Views</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {videos.map((video, index) => (
                  <VideoRow key={index} video={video} sellerId={sellerId} />
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  )
}
