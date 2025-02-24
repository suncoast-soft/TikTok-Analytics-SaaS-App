'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getErrorRedirect, getStatusRedirect, getURL } from '../helpers';

interface FormData {
  [key: string]: string | number | boolean;
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

  return '/auth/login';
}

export async function signInWithOtp(formData: FormData) {
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
    return getErrorRedirect('/auth/login', 'Sign in failed.', error.message);
  }

  console.log(data);

  return data.user
    ? getStatusRedirect(
        '/auth/login',
        'Success!',
        'Please check your email for a confirmation link. You may now close this tab.'
      )
    : getStatusRedirect('/', 'Success!', 'You are now signed in.');
}
