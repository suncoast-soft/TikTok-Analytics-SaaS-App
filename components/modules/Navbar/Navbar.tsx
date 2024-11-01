import React from 'react'
import Link from 'next/link'
import LogoBlue from '@/components/icons/LogoBlue'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react'

export default function Navbar() {
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

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex ml-8 space-x-4">
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

            <div className="hidden lg:flex justify-end items-center space-x-4 ml-auto">
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

          <div className="flex items-center space-x-4">
            {/* Sheet Trigger for Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2" aria-label="Toggle Menu">
                  <MenuIcon />
                </button>
              </SheetTrigger>

              <SheetContent side="top" className="p-4 bg-white shadow-lg">
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

                  <div className="mt-4 flex justify-end">
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
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
