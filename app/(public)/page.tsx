import SigninForm from '@/components/sections/Forms/SigninForm';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';

export default function Home() {
  const redirectMethod = getRedirectMethod();

  return (
    <>
      <SigninForm redirectMethod={redirectMethod} />
    </>
  );
}
