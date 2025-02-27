import OauthSignIn from '@/components/sections/Forms/OauthSignIn';
import Separator from '@/components/modules/Separator';
import Link from 'next/link';
import Title from '@/components/modules/Title';
import PasswordAuthForm from '@/components/sections/Forms/PasswordAuthForm';

export default async function Login({
  searchParams
}: {
  searchParams: Promise<{ type: string }>;
}) {
  const isSeller = (await searchParams).type === 'seller';

  return (
    <div className="container max-w-sm py-12">
      <Title
        tag="h1"
        title="Login to your account"
        subtitle={isSeller ? 'Seller Login' : ''}
      />

      <p className="text-white text-sm font-medium mb-8">
        Don&apos;t have an account?
        <Link
          href={isSeller ? '/auth/register?type=seller' : '/auth/register'}
          className="text-navy-300 font-bold ml-2"
        >
          Register
        </Link>
      </p>

      <PasswordAuthForm
        register={false}
        type={isSeller ? 'seller' : 'creator'}
      />

      <div className="w-full mt-4">
        <Separator text="Or continue with" />
        <OauthSignIn type={isSeller ? 'seller' : 'creator'} />
      </div>
    </div>
  );
}
