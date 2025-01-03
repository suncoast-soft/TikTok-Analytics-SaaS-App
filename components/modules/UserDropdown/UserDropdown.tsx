'use client'

import Link from 'next/link'
import { SignOut } from '@/utils/auth-helpers/server'
import { handleRequest } from '@/utils/auth-helpers/client'
import { usePathname, useRouter } from 'next/navigation'
import { getRedirectMethod } from '@/utils/auth-helpers/settings'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CircleUserIcon, LogOut } from 'lucide-react'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

interface NavlinksProps {
  user?: any
}

const FormSchema = z.object({
  pathName: z.string()
})

export default function UserDropdown({ user }: NavlinksProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true)
    await handleRequest(data, SignOut, router)
    setIsSubmitting(false)
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="overflow-hidden rounded-full p-0.5 w-7 h-7"
        >
          <CircleUserIcon className="text-slate-700" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user.auth?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={`/${user.type}/admin/analytics`}
            className={'no-underline'}
          >
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/${user.type}/admin/account`} className={'no-underline'}>
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Input
                type="hidden"
                defaultValue={usePathname()}
                {...form.register('pathName')}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center"
              >
                <LogOut size={16} />
                <span className="ml-1">Sign out</span>
              </button>
            </form>
          </Form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
