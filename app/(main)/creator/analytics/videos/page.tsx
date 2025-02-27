import { requestTikTokShopAPIClient } from '@/app/actions';
import Card from '@/components/modules/Card';
import Title from '@/components/modules/Title';
import VideoTable from '@/components/sections/VideoTable';
import { format, subDays } from 'date-fns';

export default async function VideoAnalytics() {
  const videoPerformanceListData = await requestTikTokShopAPIClient(
    '/analytics/202409/shop_videos/performance',
    {
      start_date_ge: format(subDays(new Date(), 90), 'yyyy-MM-dd'),
      end_date_lt: format(subDays(new Date(), 1), 'yyyy-MM-dd')
    },
    'GET',
    ''
  );
  const { videos } = videoPerformanceListData.data;

  return (
    <div className="container max-w-7xl py-12">
      <Card vertical={true} className="p-4 lg:p-8">
        <Title title="Video Analytics" tag="h2" />
        <VideoTable videos={videos} />
      </Card>
    </div>
  );
}
