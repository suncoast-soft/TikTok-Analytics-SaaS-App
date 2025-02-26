import Card from '@/components/modules/Card';
import Title from '@/components/modules/Title';
import VideoTable from '@/components/sections/VideoTable';
import { videos } from '@/utils/mock';

export default async function VideoAnalytics() {
  return (
    <div className="container max-w-7xl py-12">
      <Card vertical={true} className="p-4 lg:p-8">
        <Title title="Video Analytics" tag="h2" />
        <VideoTable videos={videos} />
      </Card>
    </div>
  );
}
