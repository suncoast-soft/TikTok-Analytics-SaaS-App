import Card from '@/components/modules/Card';
import DatePickerWithRange from '@/components/modules/DateRange';
import Title from '@/components/modules/Title';
import VideoTable from '@/components/sections/VideoTable';
import { Tables } from '@/types/db';
import { getSellerVideos } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { format, subDays } from 'date-fns';

interface APIParams {
  [key: string]: string | number;
}

type Video = Tables<'videos'>;

export default async function SellerAnalyticsVideos({
  searchParams
}: {
  searchParams: Promise<{
    start_date: string;
    end_date: string;
    sort_field: string;
    sort_order: string;
    page_token: string;
  }>;
}) {
  const { start_date, end_date, sort_field, sort_order, page_token } =
    await searchParams;

  const start_date_ge =
    start_date ?? format(subDays(new Date(), 30), 'yyyy-MM-dd');
  const end_date_lt = end_date ?? format(new Date(), 'yyyy-MM-dd');

  const query: APIParams = {
    start_date_ge,
    end_date_lt,
    sort_field: sort_field ?? 'gmv',
    sort_order: sort_order ?? 'DESC',
    page_size: 20
  };
  if (page_token) {
    query.page_token = page_token;
  }

  const supabase = await createClient();
  const videos = ((await getSellerVideos(supabase)) ?? []) as Video[];

  return (
    <div className="container max-w-6xl py-12">
      <Card className="p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center">
          <Title title="Video Analytics" tag="h2" />

          <DatePickerWithRange
            date={{ from: new Date(start_date_ge), to: new Date(end_date_lt) }}
          />
        </div>

        <VideoTable videos={videos} />
      </Card>
    </div>
  );
}
