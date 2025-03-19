'use client';

import { Button } from '@/components/ui/button';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithPassword, signUp } from '@/utils/auth-helpers/server';
import FormInput from '@/components/modules/FormInput';

interface PasswordAuthProps {
  register: boolean;
  type: 'seller' | 'creator';
}

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string(),
  name: z.string().optional()
});

export default function PasswordAuth({ register, type }: PasswordAuthProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      name: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    if (register) {
      await handleRequest({ ...data, type }, signUp, router);
    } else {
      await handleRequest({ ...data, type }, signInWithPassword, router);
    }

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

        <FormInput
          control={form.control}
          type="password"
          name="password"
          label="Password"
          placeholder="Your Password"
        />

        <Button
          variant="secondary"
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {register ? 'Register' : 'Login'}
        </Button>
      </form>
    </Form>
  );
}
