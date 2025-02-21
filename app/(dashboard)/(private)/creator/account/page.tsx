import Title from '@/components/modules/Title';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function Account() {
  const supabase = await createClient();
  const user = await getUser(supabase);

  if (!user) {
    return <Title title="Account Settings" />;
  }

  return (
    <div className="container max-w-7xl py-8">
      <div className="mb-12 space-y-8"></div>
    </div>
  );
}
