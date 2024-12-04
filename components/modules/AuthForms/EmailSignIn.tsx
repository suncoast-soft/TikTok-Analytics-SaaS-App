'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { signInWithEmail } from '@/utils/auth-helpers/server'
import { handleRequest } from '@/utils/auth-helpers/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
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

interface EmailSignInProps {
  allowPassword: boolean
  redirectMethod: string
  type: string
}

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' })
})

export default function EmailSignIn({
  allowPassword,
  redirectMethod,
  type
}: EmailSignInProps) {
  const router = redirectMethod === 'client' ? useRouter() : null
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true)
    await handleRequest(data, signInWithEmail, router)
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

          <Button type="submit" disabled={isSubmitting}>
            Sign In
          </Button>
        </form>
      </Form>

      {allowPassword && (
        <div className="mt-4">
          <p>
            <Link
              href={`/${type}/password_signin`}
              className="font-medium text-sm text-primary"
            >
              Sign in with email and password
            </Link>
          </p>
        </div>
      )}
    </>
  )
}
