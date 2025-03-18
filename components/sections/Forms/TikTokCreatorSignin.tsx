import crypto from 'crypto';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function TikTokCreatorSignin() {
  const { TIKTOK_CREATOR_AUTH_URL } = process.env;
  const state = crypto.randomBytes(32).toString('hex');

  return (
    <Button variant="white" asChild>
      <Link href={`${TIKTOK_CREATOR_AUTH_URL}&state=${state}`}>
        <Image
          src="/icons/tiktok-brands-solid.svg"
          width={20}
          height={20}
          alt="TikTok"
        />
        <span>Authorize Tiktok</span>
      </Link>
    </Button>
  );
}
