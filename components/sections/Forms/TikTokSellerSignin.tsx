import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function TikTokSellerSignin() {
  const { TIKTOK_SELLER_AUTH_URL } = process.env;

  return (
    <Button variant="white" asChild>
      <Link href={`${TIKTOK_SELLER_AUTH_URL}`}>
        <Image
          src="/icons/tiktok-brands-solid.svg"
          width={20}
          height={20}
          alt="Google"
        />
        <span>Authorize Tiktok Seller</span>
      </Link>
    </Button>
  );
}
