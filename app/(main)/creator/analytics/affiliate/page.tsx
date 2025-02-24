import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function AffiliateAnalytics() {
  const supabase = await createClient();
  const user = await getUser(supabase);

  if (!user) {
    return (
      <h1 className="text-2xl md:text-4xl text-white font-bold text-center mt-4 mb-8">
        Affiliate Analytics
      </h1>
    );
  }

  return <></>;
}
