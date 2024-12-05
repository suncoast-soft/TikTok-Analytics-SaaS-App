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

interface BreakdownMapping {
  type: string
  title: string
}

export default function PerformanceChart({
  date,
  data,
  config
}: {
  date: DateRange | undefined
  data: any
  config: BreakdownMapping[]
}) {
  const getBreakdownData = (data: any, type: string): Entry[] => {
    return ['Live', 'Video', 'Product Card'].map((name, index) => ({
      name: name as BreakdownName,
      value:
        parseFloat(data?.[type]?.[index]?.amount || '0') +
        parseFloat((Math.random() * 100).toFixed(2))
    }))
  }

  const PieChartComponent = ({
    title,
    data
  }: {
    title: string
    data: Entry[]
  }) => (
    <div className="w-80 max-w-full">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
          {config.map(
            (breakdown) =>
              data[breakdown.type] && (
                <PieChartComponent
                  key={breakdown.type}
                  title={breakdown.title}
                  data={getBreakdownData(data, breakdown.type)}
                />
              )
          )}
        </div>
      </CardContent>
    </Card>
  )
}
