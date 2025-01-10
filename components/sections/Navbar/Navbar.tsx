import React from 'react'
import Link from 'next/link'
import LogoBlue from '@/components/icons/LogoBlue'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import UserDropdown from '@/components/modules/UserDropdown'
import { getUser } from '@/utils/supabase/queries'
import { cn } from '@/utils/cn'

export default async function Navbar() {
  const supabase = await createClient()
  const user = await getUser(supabase)

  const navLinks = [
    {
      link: '/#features',
      name: 'Features'
    },
    {
      link: '/#howitworks',
      name: 'How It Works'
    },
    {
      link: '/#contactus',
      name: 'Contact Us'
    },
    {
      link: '/seller/admin/auth/password_signin',
      name: 'Seller Login',
      highlight: true
    }
  ]

  return (
    <nav className="sticky top-0 bg-white/95 z-40 transition-all duration-150 shadow">
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

            <nav className="hidden lg:flex ml-8 space-x-4">
              {navLinks.map((nav, index) => (
                <Link
                  key={index}
                  href={nav.link}
                  className={cn(
                    'inline-flex items-center leading-6 font-medium transition ease-in-out duration-75 cursor-pointer text-slate-700 rounded-md p-1 hover:text-slate-900',
                    nav.highlight && 'text-red-600 hover:text-red-700'
                  )}
                >
                  {nav.name}
                </Link>
              ))}
            </nav>

            {user ? (
              <div className="ml-auto">
                <UserDropdown user={user} />
              </div>
            ) : (
              <div className="hidden lg:flex justify-end items-center space-x-4 ml-auto">
                <Button variant="link" asChild>
                  <Link
                    href="/creator/admin/auth/password_signin"
                    className="no-underline"
                  >
                    Login
                  </Link>
                </Button>
                <Button variant="default" asChild>
                  <Link
                    href="/creator/admin/auth/signup"
                    className="no-underline"
                  >
                    Start Free Trial
                  </Link>
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2" aria-label="Toggle Menu">
                  <MenuIcon />
                </button>
              </SheetTrigger>

              <SheetContent side="top" className="p-4 bg-white shadow-lg">
                <SheetTitle hidden>Menu</SheetTitle>

                <nav className="space-y-2">
                  {navLinks.map((nav, index) => (
                    <Link
                      key={index}
                      href={nav.link}
                      className="block px-4 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-orange-100"
                    >
                      {nav.name}
                    </Link>
                  ))}

                  {user ? (
                    <div className="ml-auto">
                      <UserDropdown user={user} />
                    </div>
                  ) : (
                    <div className="mt-4 flex justify-end">
                      <Button variant="link" asChild>
                        <Link
                          href="/creator/admin/auth/password_signin"
                          className="no-underline"
                        >
                          Login
                        </Link>
                      </Button>
                      <Button variant="default" asChild>
                        <Link
                          href="/creator/admin/auth/signup"
                          className="no-underline"
                        >
                          Start Free Trial
                        </Link>
                      </Button>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
