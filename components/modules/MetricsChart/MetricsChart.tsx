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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { differenceInDays, format as formatDate } from 'date-fns'
import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'

type ChartConfig = Record<
  string,
  {
    label: string
    color: string
  }
>

export default function MetricsChart({
  date,
  config,
  data
}: {
  date: DateRange | undefined
  config: ChartConfig
  data: any[]
}) {
  const [selectedMetrics, setSelectedMetrics] = useState(
    Object.fromEntries(Object.keys(config).map((key) => [key, true]))
  )

  const toggleMetric = (key: string) => {
    setSelectedMetrics((prevState) => ({
      ...prevState,
      [key]: !prevState[key]
    }))
  }

  const LineTrigger = ({ id }: { id: string }) => (
    <div className="items-top flex space-x-2">
      <Checkbox
        id={id}
        checked={!!selectedMetrics[id]}
        onCheckedChange={() => toggleMetric(id)}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {config[id]?.label}
        </label>
      </div>
    </div>
  )

  return (
    <Card className="mb-5">
      <CardHeader>
        <div className="flex justify-between flex-wrap">
          <div>
            <CardTitle className="mb-2">Key metrics</CardTitle>
            <CardDescription className="mb-3">
              Key Metrics Analytics of last{' '}
              {differenceInDays(date?.to!, date?.from!)} days
            </CardDescription>
          </div>

          <div className="flex gap-x-5 gap-y-2 flex-wrap">
            {Object.keys(config).map((id) => (
              <LineTrigger key={id} id={id} />
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={config} className="w-full h-80">
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

            {Object.entries(selectedMetrics)
              .filter(([key, value]) => value && data[0]?.hasOwnProperty(key))
              .map(([key]) => (
                <Line
                  key={key}
                  dataKey={key}
                  type="monotone"
                  name={config[key].label}
                  stroke={config[key].color}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="text-sm">Based on the data at daily granularity</div>
      </CardFooter>
    </Card>
  )
}
