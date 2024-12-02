'use client'

import { requestTikTokShopAPIClient } from '@/app/actions'
import { PerformanceChart } from '@/components/modules/Seller/Dashbaord/PerformanceChart'
import { formatDate, subDays } from 'date-fns'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import Loading from '../../Loading'
import DatePickerWithRange from '../../DateRange'

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
  const [comparisonIntervals, setComparisonIntervals] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 8),
    to: subDays(new Date(), 1)
  })

  const loadInitialData = async () => {
    setIsLoading(true)

    const data = await fetchShopPerformance({
      start_date_ge: formatDate(date?.from!, 'yyyy-mm-dd'),
      end_date_lt: formatDate(date?.to!, 'yyyy-mm-dd'),
      granularity: '1D',
      with_comparison: 'true'
    })

    console.log(data)

    setIntervals(data.performance.intervals || [])
    setComparisonIntervals(data.performance.comparison_intervals || [])
    setIsLoading(false)
  }

  useEffect(() => {
    loadInitialData()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Performance Dashboard</h1>

      <div className="mt-12">
        <DatePickerWithRange date={date} setDate={setDate} />

        {isLoading ? (
          <Loading />
        ) : (
          <PerformanceChart
            intervals={intervals}
            comparisonIntervals={comparisonIntervals}
          />
        )}
      </div>
    </div>
  )
}
