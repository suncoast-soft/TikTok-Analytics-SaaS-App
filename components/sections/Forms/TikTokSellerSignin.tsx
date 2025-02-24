import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function TikTokSellerSignin() {
  return (
    <Button
      variant="default"
      type="submit"
      className="w-full text-navy-700 bg-white hover:bg-white/90"
      asChild
    >
      <Link
        href={`https://services.tiktokshops.us/open/authorize?service_id=${process.env.NEXT_PUBLIC_TIKTOK_SELLER_SERVICE_ID}`}
      >
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
