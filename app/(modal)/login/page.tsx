import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import EmailAuthForm from '@/components/sections/Forms/EmailAuthForm';
import OauthSignIn from '@/components/sections/Forms/OauthSignIn';
import Image from 'next/image';
import Separator from '@/components/modules/Separator';
import Logo from '@/components/icons/Logo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

export default async function Login() {
  const redirectMethod = getRedirectMethod();

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full flex flex-col md:flex-row">
        <div className="w-full md:w-7/12 h-full flex-shrink-0 flex flex-col justify-between">
          <div className="px-6 py-4">
            <Link href="/" className="no-underline">
              <Logo type="white" />
            </Link>
          </div>

          <div className="container max-w-sm py-12">
            <h1 className="text-white text-2xl font-bold mb-1">
              Login to your account
            </h1>
            <p className="text-white text-sm font-medium mb-8">
              Don&apos;t have an account?
              <Link href="/register" className="text-navy-300 font-bold ml-2">
                Register
              </Link>
            </p>

            <EmailAuthForm redirectMethod={redirectMethod} register={false} />

            <div className="w-full mt-4">
              <Separator text="Or continue with" />
              <OauthSignIn />
            </div>
          </div>

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
        <Link href={'/'} className="no-underline">
          <XIcon />
        </Link>
      </Button>
    </div>
  );
}
