import Link from 'next/link';
import LogoBlue from '@/components/icons/LogoBlue';
import { Button } from '@/components/ui/button';

export default async function Navbar() {
  const navLinks = [
    {
      link: '#',
      name: 'Businesses'
    },
    {
      link: '#',
      name: 'Creators and Affiliates'
    },
    {
      link: '#',
      name: 'Brands and Creators'
    },
    {
      link: '#',
      name: 'Tools'
    }
  ];
  return (
    <nav className="sticky top-0 bg-orange-50 z-40 transition-all duration-150 shadow-sm">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>

      <div className="max-w-6xl px-6 mx-auto">
        <div className="relative flex flex-row justify-between py-3 align-center md:py-4">
          <div className="flex items-center flex-1">
            <Link
              href="/"
              className="cursor-pointer rounded-full transform duration-100 ease-in-out no-underline"
              aria-label="Logo"
            >
              <LogoBlue />
            </Link>

            <nav className="ml-8 space-x-4 lg:block">
              {navLinks.map((nav, index) => (
                <Link
                  key={index}
                  href={nav.link}
                  className="inline-flex items-center leading-6 font-medium transition ease-in-out duration-75 cursor-pointer text-slate-700 rounded-md p-1 hover:text-slate-900"
                >
                  {nav.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex justify-end items-center space-x-4">
            <Button variant="link" asChild>
              <Link href="/login" className="no-underline">
                Log In
              </Link>
            </Button>

            <Button variant="default" asChild>
              <Link href="/register" className="no-underline">
                Register For Free
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
