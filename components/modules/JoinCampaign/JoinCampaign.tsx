'use client';

import { Button } from '@/components/ui/button';

export default function JoinCampaign({ style }: { style?: 'button' | 'link' }) {
  function JoinCampaign() {
    console.log('Join!');
  }

  if (style === 'button') {
    return (
      <Button className="w-60 py-3 h-12" onClick={JoinCampaign}>
        Join Now
      </Button>
    );
  } else {
    return (
      <Button
        variant="link"
        size="sm"
        className="px-0 py-0 text-blue underline mr-1"
        onClick={JoinCampaign}
      >
        Join Now
      </Button>
    );
  }
}
