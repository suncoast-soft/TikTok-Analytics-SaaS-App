'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { signInWithPassword } from '@/utils/auth-helpers/server'
import { handleRequest } from '@/utils/auth-helpers/client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'

interface PasswordSignInProps {
  allowEmail: boolean
  redirectMethod: string
  type: string
}

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string()
})

export default function PasswordSignIn({
  allowEmail,
  redirectMethod,
  type
}: PasswordSignInProps) {
  const router = redirectMethod === 'client' ? useRouter() : null
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true)
    await handleRequest(data, signInWithPassword, router)
    setIsSubmitting(false)
  }

  return (
    <>
      <p className="mb-4 text-sm text-right">
        Don't have an account?
        <Link
          href={`/${type}/signup`}
          className="ml-1.5 font-medium text-primary"
        >
          Sign up
        </Link>
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Your email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Your Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            Sign In
          </Button>
        </form>
      </Form>

      <div className="mt-4">
        <p>
          <Link
            href={`/${type}/forgot_password`}
            className="font-medium text-sm text-primary"
          >
            Forgot your password?
          </Link>
        </p>
        {allowEmail && (
          <p>
            <Link
              href={`/${type}/email_signin`}
              className="font-medium text-sm text-primary"
            >
              Sign in via magic link
            </Link>
          </p>
        )}
      </div>
    </>
  )
}
