'use client'

import { useEffect, useState } from 'react'
import { requestTikTokShopAPIClient } from '@/app/actions'
import Link from 'next/link'
import { ChartConfig } from '@/components/ui/chart'
import { formatDate, subDays } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { ChevronLeftIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import Image from 'next/image'
import DatePickerWithRange from '@/components/modules/DateRange'
import Loading from '@/components/modules/Loading'
import MetricsChart from '@/components/modules/MetricsChart'
import PerformanceChart from '@/components/modules/PerformanceChart'

interface APIParams {
  [key: string]: string | number
}

const fetchProductDetail = async (
  seller: string | undefined,
  productId: string,
  params: APIParams
) => {
  const data = await requestTikTokShopAPIClient(
    seller,
    `/product/202309/products/${productId}`,
    params,
    'GET',
    ''
  )
  return data.data
}

const fetchProductPerformance = async (
  seller: string | undefined,
  productId: string,
  params: APIParams
) => {
  const data = await requestTikTokShopAPIClient(
    seller,
    `/analytics/202405/shop_products/${productId}/performance`,
    params,
    'GET',
    ''
  )
  return data.data
}

export default function Product({
  seller,
  id,
  sellerId
}: {
  seller: string | undefined
  id: string
  sellerId?: string
}) {
  const [product, setProduct] = useState<any>([])
  const [intervals, setIntervals] = useState<any[]>([])
  const [overview, setOverview] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 8),
    to: subDays(new Date(), 1)
  })

  const loadInitialData = async () => {
    setIsLoading(true)

    const productData = await fetchProductDetail(seller, id, {})
    setProduct(productData)

    const dailyData = await fetchProductPerformance(seller, id, {
      start_date_ge: formatDate(date?.from!, 'yyyy-MM-dd'),
      end_date_lt: formatDate(date?.to!, 'yyyy-MM-dd'),
      granularity: '1D'
    })
    const overviewData = await fetchProductPerformance(seller, id, {
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
    gmv: {
      label: 'GMV',
      color: 'hsl(var(--chart-2))'
    },
    orders: {
      label: 'Orders',
      color: 'hsl(var(--chart-3))'
    },
    avg_page_visitors: {
      label: 'Avg. Page Visitors',
      color: 'hsl(var(--chart-1))'
    },
    impressions: {
      label: 'Impressions',
      color: 'hsl(var(--chart-4))'
    },
    page_views: {
      label: 'Page Views',
      color: 'hsl(var(--chart-5))'
    }
  } satisfies ChartConfig

  const metricsChartData = intervals.map((interval) => {
    return {
      date: interval.end_date,
      gmv: interval.gmv.amount,
      orders: interval.orders,
      avg_page_visitors: interval.avg_page_visitors,
      impressions: interval.impressions,
      page_views: interval.page_views
    }
  })

  const performanceChartConfig = [
    {
      type: 'avg_page_visitor_breakdowns',
      title: 'Avg. page visitors'
    },
    { type: 'click_through_rate_breakdowns', title: 'Click Through Rate' },
    { type: 'gmv_breakdowns', title: 'GMV' },
    { type: 'impression_breakdowns', title: 'Impressions' },
    { type: 'page_view_breakdowns', title: 'Page views' }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href={`/creator/sellers/${sellerId}/videos/details`}
        className="inline-flex items-center gap-1 font-medium text-sm mx-2 mb-4"
      >
        <ChevronLeftIcon size={16} />
        <span>Video Details</span>
      </Link>

      <div className="flex justify-between flex-wrap px-4">
        <h1 className="text-3xl font-bold mb-4">Product Detail</h1>
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>

      <div className="mt-4">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {product && (
              <Card>
                <CardHeader>
                  <CardTitle className="leading-normal">
                    {product.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-5">
                    <p>ID: {product.id}</p>
                    <Separator orientation="vertical" className="h-6" />
                    <p>
                      Audit:{' '}
                      {product.audit?.status === 'APPROVED' ? (
                        <span className="bg-primary text-white px-1 text-sm rounded">
                          APPROVED
                        </span>
                      ) : (
                        <span className="bg-orange-500 text-white px-1 text-sm rounded">
                          {product.audit?.status}
                        </span>
                      )}
                    </p>
                    <Separator orientation="vertical" className="h-6" />
                    <p>
                      Status:{' '}
                      {product.status === 'ACTIVATE' ? (
                        <span className="bg-primary text-white px-1 text-sm rounded">
                          ACTIVATE
                        </span>
                      ) : (
                        <span className="bg-orange-500 text-white px-1 text-sm rounded">
                          {product.status}
                        </span>
                      )}
                    </p>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex flex-wrap gap-5 mb-4">
                    <p>
                      Shop:{' '}
                      <span className="bg-secondary px-1 rounded">
                        {product.brand?.name}
                      </span>
                    </p>
                    <Separator orientation="vertical" className="h-6" />
                    <p className="bg-secondary px-1 rounded">
                      {product.category_chains
                        ?.map((chain: any) => chain.local_name)
                        .join(' > ')}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="lg:col-span-1">
                      <Carousel className="w-full max-w-lg mx-auto">
                        <CarouselContent>
                          {product.main_images?.map(
                            (image: any, index: number) => (
                              <CarouselItem key={index}>
                                <div className="p-1">
                                  <Image
                                    src={image.urls[0]}
                                    width={600}
                                    height={600}
                                    alt={product.title}
                                  />
                                </div>
                              </CarouselItem>
                            )
                          )}
                        </CarouselContent>
                      </Carousel>
                    </div>
                    <div className="lg:col-span-2">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product.description
                        }}
                        className="text-sm p-5"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
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
