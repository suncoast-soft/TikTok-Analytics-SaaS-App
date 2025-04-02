'use client';

import Link from 'next/link';
import { ReactElement } from 'react';
import { cn } from '@/utils/cn';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
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
  isSeller: boolean;
}

export default function Sidenav({ navs, isSeller }: NavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPath =
    searchParams.toString() === ''
      ? pathname
      : `${pathname}?${searchParams.toString()}`;

  const parentPath = pathname.substring(0, pathname.lastIndexOf('/'));

  return (
    <Sidebar variant="inset">
      <SidebarContent className="px-4">
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
                            'text-sm py-1 h-10 ring-0 outline-none mx-[1px] my-0.5 rounded-lg border border-navy-600 hover:border-purple',
                            (pathname === nav.link ||
                              parentPath === nav.link) &&
                              'border-purple'
                          )}
                        >
                          <span
                            className={cn(
                              'w-5 h-5',
                              (pathname === nav.link ||
                                parentPath === nav.link) &&
                                'text-blue'
                            )}
                          >
                            {nav.icon}
                          </span>
                          <span>{nav.name}</span>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub className="mx-0 p-0 ml-5 border-l border-navy-600 mt-3">
                          {nav.subnavs.map((subnav) => (
                            <SidebarMenuSubItem key={subnav.name}>
                              <SidebarMenuButton
                                size="lg"
                                className={cn(
                                  'text-xs py-1 h-8 ring-0 outline-none rounded-none pl-3 border-l border-navy-600 ml-[-1px] hover:border-blue',
                                  currentPath === subnav.link &&
                                    'border-l border-blue'
                                )}
                                asChild
                              >
                                <Link
                                  href={subnav.link ?? ''}
                                  className="px-2 py-1"
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
                    <SidebarMenuButton
                      size="lg"
                      className={cn(
                        'text-sm py-1 h-10 ring-0 outline-none mx-[1px] my-0.5 rounded-lg border border-navy-600 hover:border-purple',
                        (pathname === nav.link || parentPath === nav.link) &&
                          'border-purple'
                      )}
                      asChild
                    >
                      <Link href={nav.link ?? ''} className="px-2 py-1">
                        <span
                          className={cn(
                            'w-5 h-5',
                            (pathname === nav.link ||
                              parentPath === nav.link) &&
                              'text-blue'
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
                <Link href="/terms-and-conditions">Terms and Conditions</Link>
              </Button>

              <Button variant="link" size="sm" asChild>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </Button>

              <Button asChild className="mt-8 flex md:hidden">
                <Link href="/auth/login">Login</Link>
              </Button>

              <Button
                variant="secondary"
                className="mt-2 flex md:hidden"
                asChild
              >
                <Link href="/auth/register">Register</Link>
              </Button>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu className="gap-3">
          <Button variant="link" asChild>
            <Link
              href={isSeller ? '/' : '/seller/campaigns'}
              className="no-underline !text-blue"
            >
              {isSeller ? 'TikTok Creator Home' : 'TikTok Seller Dashboard'}
            </Link>
          </Button>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
