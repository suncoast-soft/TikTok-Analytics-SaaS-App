import Logo from '@/components/icons/Logo';
import DarkShadow from '@/components/modules/DarkShadow';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div className="h-[72px] container max-w-7xl flex justify-between items-center">
        <Link href="/" className="no-underline">
          <Logo type="white" />
        </Link>

        <div>
          <DarkShadow className="gap-2">
            <Button asChild>
              <Link href="/login" className="no-underline">
                Login
              </Link>
            </Button>

            <Button variant="secondary" asChild>
              <Link href="/register" className="no-underline">
                Register
              </Link>
            </Button>
          </DarkShadow>
        </div>
      </div>
    </header>
  );
}
