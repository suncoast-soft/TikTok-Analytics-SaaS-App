'use client'

import { DateRange } from 'react-day-picker'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { differenceInDays } from 'date-fns'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { ArrowUpIcon, HelpCircleIcon } from 'lucide-react'

export default function MetricsCards({
  date,
  overview
}: {
  date: DateRange | undefined
  overview: any
}) {
  const MetricsCard = ({
    name,
    help,
    value
  }: {
    name: string
    help: string
    value: string
  }) => (
    <div className="p-4 border rounded">
      <div className="flex gap-1.5 items-center mb-2">
        <h4 className="font-medium">{name}</h4>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircleIcon size={16} />
            </TooltipTrigger>
            <TooltipContent>
              <h5 className="text-lg font-semibold">{name}</h5>
              <p className="text-sm max-w-60">{help}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <p className="text-2xl font-semibold mb-3">{value}</p>

      <p className="text-sm text-slate-600 flex items-center">
        <span className="mr-3">
          Vs last {differenceInDays(date?.to!, date?.from!)} days
        </span>
        <ArrowUpIcon size={12} className="mr-1" />
        <span>--</span>
      </p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricsCard
            name="GMV"
            help="The total amount of paid orders from all shoppable videos, including returns and refunds."
            value={`$${parseFloat(overview.gmv?.amount ?? 0).toFixed(2)}`}
          />

          <MetricsCard
            name="SKU Orders"
            help="The total number of paid SKU orders placed directly from all shoppable videos."
            value={`${parseFloat(overview.sku_orders ?? 0)}`}
          />

          <MetricsCard
            name="Units Sold"
            help="The total number of buyers who placed orders directly from all shoppable videos."
            value={`${parseFloat(overview.units_sold ?? 0)}`}
          />

          <MetricsCard
            name="Click Through Rate"
            help="The number of product clicks divided by the number of product impressions from the video posted during the selected period."
            value={`${parseFloat(overview.click_through_rate ?? 0)}`}
          />
        </div>
      </CardContent>
    </Card>
  )
}
