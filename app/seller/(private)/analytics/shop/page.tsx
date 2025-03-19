/* eslint-disable @typescript-eslint/no-explicit-any */
import { requestTikTokShopAPIClient } from '@/app/actions';
import Card from '@/components/modules/Card';
import DatePickerWithRange from '@/components/modules/DateRange';
import MetricsChart from '@/components/modules/MetricsChart';
import PerformanceChart from '@/components/modules/PerformanceChart';
import Title from '@/components/modules/Title';
import { ChartConfig } from '@/components/ui/chart';
import { format, subDays } from 'date-fns';

interface APIParams {
  [key: string]: string | number;
}

const fetchShopPerformance = async (params: APIParams) => {
  const data = await requestTikTokShopAPIClient(
    '/analytics/202405/shop/performance',
    params,
    'GET',
    ''
  );

  return data?.data;
};

export default async function SellerAnalyticsShop({
  searchParams
}: {
  searchParams: Promise<{
    start_date: string;
    end_date: string;
  }>;
}) {
  const { start_date, end_date } = await searchParams;

  const start_date_ge =
    start_date ?? format(subDays(new Date(), 30), 'yyyy-MM-dd');
  const end_date_lt = end_date ?? format(new Date(), 'yyyy-MM-dd');

  const overviewData = await fetchShopPerformance({
    start_date_ge,
    end_date_lt
  });
  const dailyData = await fetchShopPerformance({
    start_date_ge,
    end_date_lt,
    granularity: '1D',
    with_comparison: 'true'
  });

  const overview = overviewData?.performance.intervals[0] || {};
  const intervals = dailyData?.performance.intervals || [];

  const metricsChartConfig = {
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
  } satisfies ChartConfig;

  const metricsChartData = intervals.map((interval: any) => {
    return {
      date: interval.end_date,
      buyers: interval.buyers,
      gmv: Number(interval.gmv.amount),
      orders: interval.orders,
      productImpressions: interval.product_impressions,
      productPageviews: interval.product_page_views
    };
  });

  const performanceChartConfig = [
    {
      type: 'avg_product_page_visitor_breakdowns',
      title: 'Avg. Product page visitors'
    },
    { type: 'buyer_breakdowns', title: 'Buyers' },
    { type: 'gmv_breakdowns', title: 'GMV' },
    { type: 'product_impression_breakdowns', title: 'Product Impressions' },
    { type: 'product_page_view_breakdowns', title: 'Product page views' }
  ];

  return (
    <div className="container max-w-7xl py-12">
      <Card vertical={true} className="p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center">
          <Title title="Video Analytics" tag="h2" />

          <DatePickerWithRange
            date={{ from: new Date(start_date_ge), to: new Date(end_date_lt) }}
          />
        </div>

        <MetricsChart config={metricsChartConfig} data={metricsChartData} />

        <PerformanceChart data={overview} config={performanceChartConfig} />
      </Card>
    </div>
  );
}
