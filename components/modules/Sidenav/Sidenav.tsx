'use client'

import Link from 'next/link'
import { ReactElement } from 'react'
import { cn } from '@/utils/cn'
import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import LogoBlack from '@/components/icons/LogoBlack'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ChevronUpIcon, SettingsIcon } from 'lucide-react'

type NavItem = {
  icon?: ReactElement
  name: string
  link: string
}

interface NavProps {
  navs: NavItem[]
  settings: NavItem[]
}

export default function Sidenav({ navs, settings }: NavProps) {
  const currentPath = usePathname()

  return (
    <Sidebar variant="floating">
      <SidebarHeader className="border-b mb-3">
        <Link
          href="/"
          className="cursor-pointer rounded-full transform duration-100 ease-in-out no-underline p-4"
          aria-label="Logo"
        >
          <LogoBlack />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navs.map((nav) => (
                <SidebarMenuItem key={nav.name}>
                  <SidebarMenuButton size="lg" asChild>
                    <Link
                      href={nav.link}
                      className={cn(
                        'sm:text-base',
                        currentPath === nav.link && 'bg-orange-50'
                      )}
                    >
                      <span className="w-5 h-5 mr-2">{nav.icon}</span>
                      <span>{nav.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="sm:text-base">
                  <span className="w-5 h-5 mr-2">
                    <SettingsIcon />
                  </span>
                  <span>Settings</span>
                  <ChevronUpIcon className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                {settings.map((nav) => (
                  <DropdownMenuItem
                    key={nav.name}
                    className="cursor-pointer"
                    asChild
                  >
                    <Link href={nav.link} className="no-underline">
                      {nav.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
