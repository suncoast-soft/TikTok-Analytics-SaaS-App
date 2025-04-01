import Card from '@/components/modules/Card';
import Title from '@/components/modules/Title';
import VideoTable from '@/components/sections/VideoTable';
import { Tables } from '@/types/db';
import { getCreatorVideos, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { format, subDays } from 'date-fns';

interface APIParams {
  [key: string]: string | number;
}

type User = Tables<'users'>;
type Video = Tables<'videos'>;

export default async function VideoAnalytics({
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
    start_date ?? format(subDays(new Date(), 8), 'yyyy-MM-dd');
  const end_date_lt = end_date ?? format(subDays(new Date(), 1), 'yyyy-MM-dd');

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
  const user = (await getUser(supabase)) as User;
  const videos = ((await getCreatorVideos(supabase, user.creator_username)) ??
    []) as Video[];

  return (
    <div className="container max-w-7xl py-12">
      <Card className="p-4 lg:p-8">
        <Title title="Video Analytics" tag="h2" />
        <VideoTable videos={videos} />
      </Card>
    </div>
  );
}
