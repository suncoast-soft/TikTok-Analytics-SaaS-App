import crypto from 'crypto';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function TikTokCreatorSignin() {
  const { TIKTOK_AUTH_URL, TIKTOK_AUTH_REDIRECT_URL, TIKTOK_AUTH_CLIENT_KEY } =
    process.env;
  const scope = 'user.info.basic,user.info.profile,user.info.stats,video.list';
  const state = crypto.randomBytes(32).toString('hex');

  return (
    <Button variant="white" asChild>
      <Link
        href={`${TIKTOK_AUTH_URL}?client_key=${TIKTOK_AUTH_CLIENT_KEY}&response_type=code&scope=${scope}&redirect_uri=${TIKTOK_AUTH_REDIRECT_URL}&state=${state}`}
      >
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
