'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getErrorRedirect, getStatusRedirect, getURL } from '../helpers';
import { Json } from '@/types/db';

interface FormData {
  [key: string]: string | number | boolean | Json;
}

export async function redirectToPath(path: string) {
  return redirect(path);
}

export async function SignOut(formData: FormData) {
  const pathName = String(formData['pathName']).trim();

  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return getErrorRedirect(
      pathName,
      'Hmm... Something went wrong.',
      'You could not be signed out.'
    );
  }

  return '/';
}

export async function signInWithOtp(
  formData: FormData
): Promise<string | void> {
  const email = String(formData['email']).trim();
  const type = String(formData['type']).trim();

  const supabase = await createClient();

  const { error, data } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: getURL('/auth/callback/supabase'),
      data: {
        type
      }
    }
  });

  if (error) {
    return getErrorRedirect(
      type === 'seller' ? '/auth/login?type=seller' : '/auth/login',
      'Sign in failed.',
      error.message
    );
  }

  return data.user
    ? getStatusRedirect(
        '/auth/login',
        'Success!',
        'Please check your email for a confirmation link. You may now close this tab.'
      )
    : getStatusRedirect(
        type === 'seller' ? '/seller' : '/',
        'Success!',
        'You are now signed in.'
      );
}
