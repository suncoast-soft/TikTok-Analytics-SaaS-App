'use client'

import { requestTikTokShopAPIClient } from '@/app/actions'
import { formatDate, subDays } from 'date-fns'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import Loading from '@/components/modules/Loading'
import DatePickerWithRange from '@/components/modules/DateRange'
import MetricsChart from '@/components/modules/MetricsChart'
import { ChartConfig } from '@/components/ui/chart'
import MetricsCards from '@/components/modules/MetricsCards'

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

const fetchVideoPerformanceList = async (params: APIParams) => {
  const data = await requestTikTokShopAPIClient(
    '/analytics/202409/shop_videos/performance',
    params,
    'GET',
    ''
  )

  return data?.data
}

export default function SellerVideosPerformance() {
  const [intervals, setIntervals] = useState<any[]>([])
  const [overview, setOverview] = useState({})
  const [videos, setVideos] = useState<any[]>([])
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
    const videosData = await fetchVideoPerformanceList({
      start_date_ge: formatDate(date?.from!, 'yyyy-MM-dd'),
      end_date_lt: formatDate(date?.to!, 'yyyy-MM-dd')
    })

    setIntervals(dailyData?.performance.intervals || [])
    setOverview(overviewData?.performance.intervals[0] || {})
    setVideos(videosData?.videos || [])
    setIsLoading(false)
  }

  useEffect(() => {
    loadInitialData()
  }, [date])

  const metricsChartConfig = {
    gmv: {
      label: 'GMV',
      color: 'hsl(var(--chart-2))'
    },
    sku_orders: {
      label: 'SKU Orders',
      color: 'hsl(var(--chart-3))'
    },
    units_sold: {
      label: 'Units Sold',
      color: 'hsl(var(--chart-4))'
    },
    click_through_rate: {
      label: 'Click Through Rate',
      color: 'hsl(var(--chart-5))'
    }
  } satisfies ChartConfig

  const metricsChartData = intervals.map((interval) => {
    return {
      date: interval.end_date ?? 0,
      gmv: interval.gmv?.amount ?? 0,
      sku_orders: interval.sku_orders ?? 0,
      units_sold: interval.units_sold ?? 0,
      click_through_rate: interval.click_through_rate ?? 0
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-between px-4">
        <h1 className="text-3xl font-bold mb-4">Video Performance Metrics</h1>
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>

      <div className="mt-4">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <MetricsCards date={date} overview={overview} />
            <MetricsChart
              date={date}
              config={metricsChartConfig}
              data={metricsChartData}
            />
          </>
        )}
      </div>
    </div>
  )
}
