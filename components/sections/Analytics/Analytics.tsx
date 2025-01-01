'use client'

import { requestTikTokShopAPIClient } from '@/app/actions'
import { formatDate, subDays } from 'date-fns'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import Loading from '@/components/modules/Loading'
import DatePickerWithRange from '@/components/modules/DateRange'
import MetricsChart from '@/components/modules/MetricsChart'
import PerformanceChart from '@/components/modules/PerformanceChart'
import { ChartConfig } from '@/components/ui/chart'

interface APIParams {
  [key: string]: string | number
}

const fetchShopPerformance = async (params: APIParams) => {
  const data = await requestTikTokShopAPIClient(
    '/analytics/202405/shop/performance',
    params,
    'GET',
    ''
  )

  return data?.data
}

export default function SellerAnalytics() {
  const [intervals, setIntervals] = useState<any[]>([])
  const [overview, setOverview] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 8),
    to: subDays(new Date(), 1)
  })

  const loadInitialData = async () => {
    setIsLoading(true)

    const dailyData = await fetchShopPerformance({
      start_date_ge: formatDate(date?.from!, 'yyyy-MM-dd'),
      end_date_lt: formatDate(date?.to!, 'yyyy-MM-dd'),
      granularity: '1D'
    })
    const overviewData = await fetchShopPerformance({
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

  const metricsChartConfig = {
    buyers: {
      label: 'Buyers',
      color: 'hsl(var(--chart-1))'
    },
    gmv: {
      label: 'GMV',
      color: 'hsl(var(--chart-2))'
    },
    orders: {
      label: 'Orders',
      color: 'hsl(var(--chart-3))'
    },
    productImpressions: {
      label: 'Product Impressions',
      color: 'hsl(var(--chart-4))'
    },
    productPageviews: {
      label: 'Product Page Views',
      color: 'hsl(var(--chart-5))'
    }
  } satisfies ChartConfig

  const metricsChartData = intervals.map((interval) => {
    return {
      date: interval.end_date,
      buyers: interval.buyers,
      gmv: interval.gmv.amount,
      orders: interval.orders,
      productImpressions: interval.product_impressions,
      productPageviews: interval.product_page_views
    }
  })

  const performanceChartConfig = [
    {
      type: 'avg_product_page_visitor_breakdowns',
      title: 'Avg. Product page visitors'
    },
    { type: 'buyer_breakdowns', title: 'Buyers' },
    { type: 'gmv_breakdowns', title: 'GMV' },
    { type: 'product_impression_breakdowns', title: 'Product Impressions' },
    { type: 'product_page_view_breakdowns', title: 'Product page views' }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between flex-wrap px-4">
        <h1 className="text-3xl font-bold mb-4">Analytics</h1>
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>

      <div className="mt-4">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <MetricsChart
              date={date}
              config={metricsChartConfig}
              data={metricsChartData}
            />
            <PerformanceChart
              date={date}
              data={overview}
              config={performanceChartConfig}
            />
          </>
        )}
      </div>
    </div>
  )
}
