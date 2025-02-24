'use client';

import { Button } from '@/components/ui/button';
import { deleteCreatorAuthMutation } from '@/utils/supabase/server';
import Image from 'next/image';
import { useState } from 'react';

export default function TikTokCreatorSignout() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await deleteCreatorAuthMutation();
    setIsSubmitting(false);
  };

  return (
    <div className="mt-4">
      <form className="pb-2" onSubmit={() => handleSubmit()}>
        <Button variant="destructive" type="submit" disabled={isSubmitting}>
          <Image
            src="/icons/tiktok-brands-solid.svg"
            width={16}
            height={16}
            alt="TikTok"
          />
          <span>Disconnect Tiktok Account</span>
        </Button>
      </form>
    </div>
  );
}
