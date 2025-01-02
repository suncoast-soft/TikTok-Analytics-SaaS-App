'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'

const FormSchema = z.object({
  email: z.string().min(2, {
    message: 'Email must be at least 2 characters.'
  })
})

export default function SubscriptionForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: ''
    }
  })

  function onSubmit() {
    toast({
      title: 'Subscription Success!'
    })
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 px-4">
      <h4 className="text-xl sm:text-2xl text-center sm:text-left font-bold mb-4 md:mb-0">
        Subscribe to Our Newsletter
      </h4>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row items-center gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    className="w-64"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="default">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
