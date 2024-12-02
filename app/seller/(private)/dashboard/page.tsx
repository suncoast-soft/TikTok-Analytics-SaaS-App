import BreakdownTable from '@/components/modules/Seller/Dashbaord/BreakdownTable'
import LineChart from '@/components/modules/Seller/Dashbaord/LineChart'
import SummaryCard from '@/components/modules/Seller/Dashbaord/SummaryCard'
import { FC } from 'react'

const performance = {
  intervals: [
    {
      avg_order_value: {
        amount: '0.00',
        currency: ''
      },
      avg_product_page_visitor_breakdowns: [
        {
          amount: 0,
          type: 'LIVE'
        },
        {
          amount: 0,
          type: 'VIDEO'
        },
        {
          amount: 0,
          type: 'PRODUCT_CARD'
        }
      ],
      avg_product_page_visitors: 0,
      buyer_breakdowns: [
        {
          amount: 0,
          type: 'LIVE'
        },
        {
          amount: 0,
          type: 'VIDEO'
        },
        {
          amount: 0,
          type: 'PRODUCT_CARD'
        }
      ],
      buyers: 0,
      cancellations_and_returns: 0,
      end_date: '2024-12-01',
      gmv: {
        amount: '0.00',
        currency: ''
      },
      gmv_breakdowns: [
        {
          amount: '0.00',
          currency: '',
          type: 'LIVE'
        },
        {
          amount: '0.00',
          currency: '',
          type: 'VIDEO'
        },
        {
          amount: '0.00',
          currency: '',
          type: 'PRODUCT_CARD'
        }
      ],
      orders: 0,
      product_impression_breakdowns: [
        {
          amount: 0,
          type: 'LIVE'
        },
        {
          amount: 0,
          type: 'VIDEO'
        },
        {
          amount: 13,
          type: 'PRODUCT_CARD'
        }
      ],
      product_impressions: 13,
      product_page_view_breakdowns: [
        {
          amount: 0,
          type: 'LIVE'
        },
        {
          amount: 0,
          type: 'VIDEO'
        },
        {
          amount: 0,
          type: 'PRODUCT_CARD'
        }
      ],
      product_page_views: 0,
      refunds: {
        amount: '0.00',
        currency: ''
      },
      sku_orders: 0,
      start_date: '2024-10-01',
      units_sold: 0
    }
  ]
}

const Dashboard: FC<{ apiData: any }> = () => {
  const { intervals } = performance
  const interval = intervals[0]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Performance Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SummaryCard title="Buyers" value={interval.buyers} />
        <SummaryCard title="Orders" value={interval.orders} />
        <SummaryCard
          title="Product Page Views"
          value={interval.product_page_views}
        />
      </div>

      <div className="mt-12">
        <LineChart data={performance} />
      </div>

      <BreakdownTable
        data={interval.avg_product_page_visitor_breakdowns}
        title="Avg Product Page Visitor Breakdowns"
      />
      <BreakdownTable
        data={interval.buyer_breakdowns}
        title="Buyer Breakdowns"
      />
    </div>
  )
}

export default Dashboard
