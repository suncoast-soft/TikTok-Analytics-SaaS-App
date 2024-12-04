'use client'

import { DateRange } from 'react-day-picker'
import { LineChart, CartesianGrid, Line, XAxis, Legend } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { differenceInDays, formatDate } from 'date-fns'
import { Dispatch, SetStateAction, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'

const chartConfig = {
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

type LineTriggerConfig = {
  id: 'buyers' | 'gmv' | 'orders' | 'productImpressions' | 'productPageviews'
  value: boolean
  setValue: React.Dispatch<React.SetStateAction<boolean>>
}

export function MetricsChart({
  date,
  intervals
}: {
  date: DateRange | undefined
  intervals: any[]
}) {
  const [buyers, setBuyers] = useState<boolean>(false)
  const [gmv, setGmv] = useState<boolean>(true)
  const [orders, setOrders] = useState<boolean>(false)
  const [productImpressions, setProductImpressions] = useState<boolean>(true)
  const [productPageviews, setProductPageviews] = useState<boolean>(false)

  const lineTriggers: LineTriggerConfig[] = [
    { id: 'buyers', value: buyers, setValue: setBuyers },
    { id: 'gmv', value: gmv, setValue: setGmv },
    { id: 'orders', value: orders, setValue: setOrders },
    {
      id: 'productImpressions',
      value: productImpressions,
      setValue: setProductImpressions
    },
    {
      id: 'productPageviews',
      value: productPageviews,
      setValue: setProductPageviews
    }
  ]

  const data = intervals.map((interval) => {
    return {
      date: interval.end_date,
      buyers: interval.buyers,
      gmv: interval.gmv.amount,
      orders: interval.orders,
      productImpressions: interval.product_impressions,
      productPageviews: interval.product_page_views
    }
  })

  const LineTrigger = ({
    id,
    value,
    setValue
  }: {
    id: 'buyers' | 'gmv' | 'orders' | 'productImpressions' | 'productPageviews'
    value: boolean
    setValue: Dispatch<SetStateAction<boolean>>
  }) => {
    return (
      <div className="items-top flex space-x-2">
        <Checkbox
          id={id}
          checked={value}
          onCheckedChange={(checked) => setValue(checked === true)}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {chartConfig[id]?.label}
          </label>
        </div>
      </div>
    )
  }

  return (
    <Card className="mb-5">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle className="mb-2">Key metrics</CardTitle>
            <CardDescription>
              Key Metrics Analytics of last{' '}
              {differenceInDays(date?.to!, date?.from!)} days
            </CardDescription>
          </div>

          <div className="flex space-x-5">
            {lineTriggers.map(({ id, value, setValue }) => (
              <LineTrigger key={id} id={id} value={value} setValue={setValue} />
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-80">
          <LineChart
            width={600}
            height={300}
            margin={{ left: 12, right: 12 }}
            data={data}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                formatDate(new Date(value), 'MMM dd, y')
              }
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Legend />

            {buyers && (
              <Line
                dataKey="buyers"
                type="monotone"
                name={chartConfig.buyers.label}
                stroke={chartConfig.buyers.color}
                strokeWidth={2}
                dot={false}
              />
            )}

            {gmv && (
              <Line
                dataKey="gmv"
                type="monotone"
                name={chartConfig.gmv.label}
                stroke={chartConfig.gmv.color}
                strokeWidth={2}
                dot={false}
              />
            )}

            {orders && (
              <Line
                dataKey="orders"
                type="monotone"
                name={chartConfig.orders.label}
                stroke={chartConfig.orders.color}
                strokeWidth={2}
                dot={false}
              />
            )}

            {productImpressions && (
              <Line
                dataKey="productImpressions"
                type="monotone"
                name={chartConfig.productImpressions.label}
                stroke={chartConfig.productImpressions.color}
                strokeWidth={2}
                dot={false}
              />
            )}

            {productPageviews && (
              <Line
                dataKey="productPageviews"
                type="monotone"
                name={chartConfig.productPageviews.label}
                stroke={chartConfig.productPageviews.color}
                strokeWidth={2}
                dot={false}
              />
            )}
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="text-sm">Based on the data at daily granularity</div>
      </CardFooter>
    </Card>
  )
}
