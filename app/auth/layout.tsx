import Image from 'next/image';
import Logo from '@/components/icons/Logo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

export default async function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full flex flex-col md:flex-row">
        <div className="w-full md:w-7/12 h-full flex-shrink-0 flex flex-col justify-between">
          <div className="px-6 py-4">
            <Link href="/">
              <Logo type="white" />
            </Link>
          </div>

          {children}

          <div className="bg-navy-900 flex flex-row justify-center gap-4 px-8 py-6">
            <Link
              href="/terms-and-conditions"
              className="text-xs text-navy-300"
            >
              Terms and conditions
            </Link>
            <Link href="/privacy-policy" className="text-xs text-navy-300">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="hidden md:block w-full md:w-5/12 h-full bg-navy-950">
          <Image
            src={'/landing/analytics-1.jpg'}
            width={4298}
            height={3264}
            alt="Login"
            className="h-full object-cover opacity-50"
          />
        </div>
      </div>

      <Button
        variant="white"
        size="icon"
        className="absolute top-4 right-4"
        asChild
      >
        <Link href={'/'}>
          <XIcon />
        </Link>
      </Button>
    </div>
  );
}
