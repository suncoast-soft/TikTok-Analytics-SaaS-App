'use client';

import Link from 'next/link';
import { ReactElement } from 'react';
import { cn } from '@/utils/cn';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDown, ChevronUpIcon, SettingsIcon } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';

type NavItem = {
  icon?: ReactElement;
  name: string;
  link?: string;
  subnavs?: {
    name: string;
    link: string;
  }[];
};

interface NavProps {
  navs: NavItem[];
  settings: NavItem[];
  label?: string;
}

export default function Sidenav({ navs, settings, label }: NavProps) {
  const currentPath = usePathname();

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="h-16"></SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {label && (
            <SidebarGroupLabel>
              <span className="bg-primary text-white px-1.5 py-0.5 rounded">
                {label}
              </span>
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu>
              {navs.map((nav) =>
                nav.subnavs ? (
                  <Collapsible
                    key={nav.name}
                    defaultOpen
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton size="lg">
                          <span className="w-5 h-5 mr-2">{nav.icon}</span>
                          <span>{nav.name}</span>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {nav.subnavs.map((subnav) => (
                            <SidebarMenuSubItem key={subnav.name}>
                              <SidebarMenuButton size="lg" asChild>
                                <Link
                                  href={subnav.link ?? ''}
                                  className={cn(
                                    'sm:text-base',
                                    currentPath === subnav.link &&
                                      'bg-orange-50'
                                  )}
                                >
                                  <span>{subnav.name}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={nav.name}>
                    <SidebarMenuButton size="lg" asChild>
                      <Link
                        href={nav.link ?? ''}
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
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu modal={false}>
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
                    <Link href={nav.link ?? ''} className="no-underline">
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
  );
}
