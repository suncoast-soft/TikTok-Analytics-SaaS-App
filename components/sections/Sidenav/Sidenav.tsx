'use client';

import Link from 'next/link';
import { ReactElement } from 'react';
import { cn } from '@/utils/cn';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem
} from '@/components/ui/sidebar';

import { ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

type NavItem = {
  icon?: ReactElement;
  name: string;
  link?: string;
  subnavs?: {
    icon?: ReactElement;
    name: string;
    link: string;
  }[];
};

interface NavProps {
  navs: NavItem[];
}

export default function Sidenav({ navs }: NavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPath = `${pathname}?${searchParams.toString()}`;

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="h-14"></SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {navs.map((nav) =>
                nav.subnavs ? (
                  <Collapsible
                    key={nav.name}
                    defaultOpen
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          size="lg"
                          className={cn(
                            'text-sm py-1 h-10 ring-0 outline-none bg-navy-600 hover:!bg-navy-500 mx-[1px] my-0.5 rounded-lg data-[state=open]:rounded-b-none',
                            currentPath === nav.link && 'bg-navy-400'
                          )}
                        >
                          <span
                            className={cn(
                              'w-5 h-5',
                              currentPath === nav.link && 'text-amber-400'
                            )}
                          >
                            {nav.icon}
                          </span>
                          <span>{nav.name}</span>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub className="mx-0 p-0 border-none bg-navy-700 rounded-b-lg overflow-hidden">
                          {nav.subnavs.map((subnav) => (
                            <SidebarMenuSubItem key={subnav.name}>
                              <SidebarMenuButton
                                size="lg"
                                className={cn(
                                  'text-xs py-1 h-10 ring-0 outline-none rounded-none hover:bg-navy-600',
                                  currentPath === subnav.link && 'bg-navy-400'
                                )}
                                asChild
                              >
                                <Link
                                  href={subnav.link ?? ''}
                                  className="px-2 py-1"
                                >
                                  <span
                                    className={cn(
                                      'w-5 h-5',
                                      currentPath === subnav.link &&
                                        'text-amber-400'
                                    )}
                                  >
                                    {subnav.icon}
                                  </span>
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
                    <SidebarMenuButton
                      size="lg"
                      className={cn(
                        'text-sm py-1 h-10 ring-0 outline-none bg-navy-600 hover:!bg-navy-500 mx-[1px] my-0.5 rounded-lg data-[state=open]:rounded-b-none',
                        currentPath === nav.link && 'bg-navy-400'
                      )}
                      asChild
                    >
                      <Link href={nav.link ?? ''} className="px-2 py-1">
                        <span
                          className={cn(
                            'w-5 h-5',
                            currentPath === nav.link && 'text-amber-400'
                          )}
                        >
                          {nav.icon}
                        </span>
                        <span>{nav.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}

              <Button variant="link" size="sm" className="mt-3" asChild>
                <Link href="/terms-and-conditions" className="no-underline">
                  Terms and Conditions
                </Link>
              </Button>

              <Button variant="link" size="sm" asChild>
                <Link href="/privacy-policy" className="no-underline">
                  Privacy Policy
                </Link>
              </Button>

              <Button asChild className="mt-8 flex md:hidden">
                <Link href="/login" className="no-underline">
                  Login
                </Link>
              </Button>

              <Button
                variant="secondary"
                className="mt-2 flex md:hidden"
                asChild
              >
                <Link href="/register" className="no-underline">
                  Register
                </Link>
              </Button>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
