'use client'

import { DateRange } from 'react-day-picker'
import { PieChart, Pie, Legend, Cell } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { differenceInDays } from 'date-fns'
import { Tooltip } from '@radix-ui/react-tooltip'

type BreakdownName = 'Live' | 'Video' | 'Product Card'

interface Entry {
  name: BreakdownName
  value: number
}

const chartConfig = {
  Live: {
    color: 'hsl(var(--chart-2))'
  },
  Video: {
    color: 'hsl(var(--chart-3))'
  },
  'Product Card': {
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig

export default function PerformanceChart({
  date,
  overview
}: {
  date: DateRange | undefined
  overview: any
}) {
  type BreakdownType =
    | 'avg_product_page_visitor_breakdowns'
    | 'buyer_breakdowns'
    | 'gmv_breakdowns'
    | 'product_impression_breakdowns'
    | 'product_page_view_breakdowns'

  const getBreakdownData = (overview: any, type: BreakdownType): Entry[] => {
    return ['Live', 'Video', 'Product Card'].map((name, index) => ({
      name: name as BreakdownName,
      value:
        parseFloat(overview?.[type]?.[index]?.amount) +
        parseFloat((Math.random() * 100).toFixed(2))
    }))
  }

  const avg_product_page_visitor_breakdowns_data: Entry[] = getBreakdownData(
    overview,
    'avg_product_page_visitor_breakdowns'
  )
  const buyer_breakdowns_data: Entry[] = getBreakdownData(
    overview,
    'buyer_breakdowns'
  )
  const gmv_breakdowns_data: Entry[] = getBreakdownData(
    overview,
    'gmv_breakdowns'
  )
  const product_impression_breakdowns_data: Entry[] = getBreakdownData(
    overview,
    'product_impression_breakdowns'
  )
  const product_page_view_breakdowns_data: Entry[] = getBreakdownData(
    overview,
    'product_page_view_breakdowns'
  )

  const PieChartComponent = ({
    title,
    data
  }: {
    title: string
    data: Entry[]
  }) => (
    <div className="w-80">
      <h4 className="text-lg font-semibold text-center text-slate-800">
        {title}
      </h4>
      <ChartContainer config={chartConfig} className="w-full h-64">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry: Entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={chartConfig[entry.name].color}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ChartContainer>
    </div>
  )

  return (
    <Card className="mb-5">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle className="mb-2">Performance breakdown</CardTitle>
            <CardDescription>
              Performance breakdown of last{' '}
              {differenceInDays(date?.to!, date?.from!)} days
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-x-4 gap-y-12">
          <PieChartComponent
            title="Avg. Product page visitors"
            data={avg_product_page_visitor_breakdowns_data}
          />
          <PieChartComponent title="Buyers" data={buyer_breakdowns_data} />
          <PieChartComponent title="GMV" data={gmv_breakdowns_data} />
          <PieChartComponent
            title="Product Impressions"
            data={product_impression_breakdowns_data}
          />
          <PieChartComponent
            title="Product page views"
            data={product_page_view_breakdowns_data}
          />
        </div>
      </CardContent>
    </Card>
  )
}
