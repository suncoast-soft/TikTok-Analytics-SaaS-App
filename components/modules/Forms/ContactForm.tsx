'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { toast } from '@/hooks/use-toast'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { Input } from '@/components/ui/input'

const FormSchema = z.object({
  email: z.string(),
  message: z
    .string()
    .min(10, {
      message: 'Message must be at least 10 characters.'
    })
    .max(300, {
      message: 'Message can not be longer than 300 characters.'
    })
})

export default function ContactForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      message: ''
    }
  })

  function onSubmit() {
    toast({
      title: 'Your request has been received successfully!'
    })
  }

  return (
    <div className="max-w-3xl mx-auto shadow-lg px-6 py-12 rounded bg-orange-50/40 mb-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about your request"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please check our{' '}
                  <Link href="/terms-of-service" className="border-b-2">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy-policy" className="border-b-2">
                    Privacy Policy
                  </Link>
                  {'.'}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="glassy" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
