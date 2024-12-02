'use client'

import { requestTikTokShopAPIClient } from '@/app/actions'
import { PerformanceChart } from '@/components/modules/Seller/Dashbaord/PerformanceChart'
import { formatDate, subDays } from 'date-fns'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import Loading from '../../Loading'
import DatePickerWithRange from '../../DateRange'
import { MetricsChart } from './MetricsChart'

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

  return data.data
}

export default function SellerDashboard() {
  const [intervals, setIntervals] = useState([])
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

    console.log(dailyData)
    console.log(overviewData)

    setIntervals(dailyData.performance.intervals || [])
    setOverview(overviewData.performance.intervals[0] || {})
    setIsLoading(false)
  }

  useEffect(() => {
    loadInitialData()
  }, [date])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between px-4">
        <h1 className="text-3xl font-bold mb-4">Analytics</h1>
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>

      <div className="mt-4">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <MetricsChart date={date} intervals={intervals} />
            <PerformanceChart date={date} overview={overview} />
          </>
        )}
      </div>
    </div>
  )
}
