import Separator from '@/components/modules/Separator';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import OauthSignIn from '../Forms/OauthSignIn';

export default function Welcome() {
  return (
    <div className="bg-navy-800 rounded-xl overflow-hidden mb-12">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 lg:w-2/3 h-80 bg-navy-950">
          <Image
            src="/landing/analytics-2.jpg"
            width={5472}
            height={3648}
            alt="Register"
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 h-80 px-8 py-6 flex flex-col justify-center items-center gap-3">
          <h1 className="text-white text-2xl font-bold text-center">
            Welcome to Flicker
          </h1>

          <Button variant="link" className="my-2" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>

          <Button variant="secondary" className="w-full" asChild>
            <Link href="/auth/register">Register</Link>
          </Button>

          <div className="w-full">
            <Separator text="Or continue with" />
            <OauthSignIn type="creator" />
          </div>
        </div>
      </div>
    </div>
  );
}
