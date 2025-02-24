import EmailAuthForm from '@/components/sections/Forms/EmailAuthForm';
import OauthSignIn from '@/components/sections/Forms/OauthSignIn';
import Separator from '@/components/modules/Separator';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Title from '@/components/modules/Title';

export default async function Register({
  searchParams
}: {
  searchParams: Promise<{ type: string }>;
}) {
  const isSeller = (await searchParams).type === 'seller';

  return (
    <div className="container max-w-sm py-12">
      <Title
        tag="h1"
        title="Create your account"
        subtitle={isSeller ? 'Seller Registration' : ''}
      />

      <p className="text-white text-sm font-medium mb-8">
        Already have an account?
        <Link
          href={isSeller ? '/auth/login?type=seller' : '/auth/login'}
          className="text-navy-300 font-bold ml-2"
        >
          Login
        </Link>
      </p>

      <EmailAuthForm register={true} type={isSeller ? 'seller' : 'creator'} />

      <div className="w-full mt-4">
        <Separator />

        <div className="flex gap-2 mt-5">
          <Checkbox id="terms1" />
          <Label
            htmlFor="terms1"
            className="text-xs font-light text-navy-300 leading-relaxed tracking-wide"
          >
            I have read and accept the{' '}
            <Link
              href="/terms-and-conditions"
              className="font-normal text-navy-400"
            >
              Terms and conditions
            </Link>
            {', '}
            <Link href="privacy-policy" className="font-normal text-navy-400">
              Privacy Policy
            </Link>
            {', '}
            and all associated policies. *
          </Label>
        </div>
      </div>

      <div className="w-full mt-4">
        <Separator text="Or continue with" />
        <OauthSignIn type={isSeller ? 'seller' : 'creator'} />
      </div>
    </div>
  );
}
