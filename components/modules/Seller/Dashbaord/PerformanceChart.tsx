'use client'

import { LineChart, CartesianGrid, Line, XAxis } from 'recharts'
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

const chartConfig = {
  current: {
    label: 'Current Week',
    color: 'hsl(var(--chart-1))'
  },
  comparison: {
    label: 'Previous Week',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig

export function PerformanceChart({
  intervals,
  comparisonIntervals
}: {
  intervals: any[]
  comparisonIntervals: any[]
}) {
  const intervalsData = intervals.map((interval) => {
    return {
      date: interval.end_date,
      product_impressions_1: interval.product_impressions
    }
  })
  const comparisonIntervalsData = comparisonIntervals.map((interval) => {
    return {
      date: interval.end_date,
      product_impressions_2: interval.product_impressions
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Product Impressions</CardTitle>
        <CardDescription>
          Comparison of Last Week vs. Previous Week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart width={500} height={300} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toDateString().slice(0, 3)
              }
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              data={intervalsData}
              dataKey="product_impressions_1"
              type="monotone"
              stroke={chartConfig.comparison.color}
              strokeWidth={2}
              dot={false}
            />
            <Line
              data={comparisonIntervalsData}
              dataKey="product_impressions_2"
              type="monotone"
              stroke={chartConfig.current.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="text-sm">
          Displaying analytics over the last week compared to the previous week.
        </div>
      </CardFooter>
    </Card>
  )
}
