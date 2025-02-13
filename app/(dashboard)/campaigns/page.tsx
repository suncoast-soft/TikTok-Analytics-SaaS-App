import Listing from '@/components/sections/Listing';
import { Suspense } from 'react';

export default function Campaigns() {
  return (
    <div className="container max-w-7xl py-8">
      <Suspense>
        <Listing />
      </Suspense>
    </div>
  );
}
