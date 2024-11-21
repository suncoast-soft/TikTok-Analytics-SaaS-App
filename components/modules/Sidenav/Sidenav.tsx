'use client'

import Link from 'next/link'
import { ReactElement } from 'react'
import { cn } from '@/utils/cn'
import { usePathname } from 'next/navigation'
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

type NavItem = {
  icon: ReactElement
  name: string
  link: string
}

interface NavProps {
  navs: NavItem[]
}

export default function Sidenav({ navs }: NavProps) {
  const currentPath = usePathname()

  return (
    <>
      {navs.map((nav) => (
        <SidebarMenuItem key={nav.name}>
          <SidebarMenuButton size="lg" asChild>
            <Link
              href={nav.link}
              className={cn(
                'flex items-start gap-4 px-2.5 py-2 w-full bg-transparent no-underline hover:bg-orange-100 sm:text-base',
                currentPath === nav.link && 'bg-orange-100 font-medium'
              )}
            >
              <span className="w-5 h-5">{nav.icon}</span>
              <span>{nav.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  )
}
