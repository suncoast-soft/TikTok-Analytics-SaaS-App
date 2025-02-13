import Logo from '@/components/icons/Logo';
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
          <div className="flex gap-2 bg-navy-900 p-1 rounded-2xl">
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
          </div>
        </div>
      </div>
    </header>
  );
}
