'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getUser } from '../supabase/queries';
import { getErrorRedirect, getStatusRedirect } from '../helpers';

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

  return '/login';
}

export async function signInWithOtp(formData: FormData) {
  const email = String(formData['email']).trim();

  const supabase = await createClient();
  const user = await getUser(supabase);

  if (user) {
    const { data, error } = await supabase.auth.updateUser({
      email: email
    });

    if (error)
      return getErrorRedirect('/login', 'Sign up failed.', error.message);

    return data.user
      ? getStatusRedirect(
          '/login',
          'Success!',
          'Please check your email for a confirmation link. You may now close this tab.'
        )
      : getStatusRedirect('/', 'Success!', 'You are now signed in.');
  } else {
    const { error, data } = await supabase.auth.signInWithOtp({
      email: email
    });

    if (error) {
      return getErrorRedirect('/login', 'Sign in failed.', error.message);
    }

    return data.user
      ? getStatusRedirect(
          '/login',
          'Success!',
          'Please check your email for a confirmation link. You may now close this tab.'
        )
      : getStatusRedirect('/', 'Success!', 'You are now signed in.');
  }
}
