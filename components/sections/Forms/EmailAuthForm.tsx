'use client';

import { Button } from '@/components/ui/button';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithOtp } from '@/utils/auth-helpers/server';
import FormInput from '@/components/modules/FormInput';

interface EmailSignInProps {
  register: boolean;
  type: 'seller' | 'creator';
}

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  name: z.string().optional()
});

export default function EmailSignIn({ register, type }: EmailSignInProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      name: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    await handleRequest({ ...data, type }, signInWithOtp, router);
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-xl"
      >
        {register && (
          <FormInput
            control={form.control}
            name="name"
            label="Name"
            placeholder="Your Full Name"
          />
        )}

        <FormInput
          control={form.control}
          type="email"
          name="email"
          label="Email"
          placeholder="Your Email Address"
        />

        <Button
          variant="secondary"
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          Register
        </Button>
      </form>
    </Form>
  );
}
