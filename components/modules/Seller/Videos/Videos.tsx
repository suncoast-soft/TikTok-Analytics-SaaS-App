'use client'

import { requestTikTokShopAPIClient } from '@/app/actions'
import { formatDate, subDays } from 'date-fns'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import Loading from '../../Loading'
import DatePickerWithRange from '../../DateRange'
import MetricsChart from '../../MetricsChart'
import PerformanceChart from '../../PerformanceChart'
import MetricsCards from '../../MetricsCards'

interface APIParams {
  [key: string]: string | number
}

const fetchVideoPerformanceOverview = async (params: APIParams) => {
  const data = await requestTikTokShopAPIClient(
    '/analytics/202409/shop_videos/overview_performance',
    params,
    'GET',
    ''
  )

  return data?.data
}

export default function SellerVideos() {
  const [intervals, setIntervals] = useState([])
  const [overview, setOverview] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 8),
    to: subDays(new Date(), 1)
  })

  const loadInitialData = async () => {
    setIsLoading(true)

    const dailyData = await fetchVideoPerformanceOverview({
      start_date_ge: formatDate(date?.from!, 'yyyy-MM-dd'),
      end_date_lt: formatDate(date?.to!, 'yyyy-MM-dd'),
      granularity: '1D'
    })
    const overviewData = await fetchVideoPerformanceOverview({
      start_date_ge: formatDate(date?.from!, 'yyyy-MM-dd'),
      end_date_lt: formatDate(date?.to!, 'yyyy-MM-dd')
    })

    setIntervals(dailyData?.performance.intervals || [])
    setOverview(overviewData?.performance.intervals[0] || {})
    setIsLoading(false)
  }

  useEffect(() => {
    loadInitialData()
  }, [date])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between px-4">
        <h1 className="text-3xl font-bold mb-4">Video Performance Metrics</h1>
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>

      <div className="mt-4">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <MetricsCards date={date} overview={overview} />
            {/* <MetricsChart date={date} intervals={intervals} /> */}
          </>
        )}
      </div>
    </div>
  )
}
