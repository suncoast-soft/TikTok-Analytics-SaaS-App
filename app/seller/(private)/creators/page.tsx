import Card from '@/components/modules/Card';
import Title from '@/components/modules/Title';
import CreatorTable from '@/components/sections/CreatorTable';
import { affiliate_creators } from '@/utils/mock';

export default async function SellerCreators() {
  return (
    <div className="container max-w-7xl py-12">
      <Card vertical={true} className="p-4 lg:p-8">
        <Title title="Affiliate Creators" tag="h2" />
        <CreatorTable creators={affiliate_creators} />
      </Card>
    </div>
  );
}
