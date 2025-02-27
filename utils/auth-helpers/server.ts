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

export async function signInWithPassword(formData: FormData) {
  const type = String(formData['type']).trim();
  const email = String(formData['email']).trim();
  const password = String(formData['password']).trim();

  const supabase = await createClient();
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password
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
        type === 'seller' ? '/seller' : '/',
        'Success!',
        'You are now signed in.'
      )
    : getErrorRedirect(
        type === 'seller' ? '/auth/login?type=seller' : '/auth/login',
        'Sign in failed.',
        'You could not be signed in.'
      );
}

export async function signUp(formData: FormData) {
  const type = String(formData['type']).trim();
  const name = String(formData['name']).trim();
  const email = String(formData['email']).trim();
  const password = String(formData['password']).trim();

  const supabase = await createClient();
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: getURL('/auth/callback/supabase'),
      data: { type: type, name: name }
    }
  });

  if (error) {
    return getErrorRedirect(
      type === 'seller' ? '/auth/register?type=seller' : '/auth/register',
      'Sign up failed.',
      error.message
    );
  }

  if (data.session) {
    return getStatusRedirect(
      type === 'seller' ? '/seller' : '/',
      'Success!',
      'You are now signed in.'
    );
  }

  return data.user
    ? getStatusRedirect(
        type === 'seller' ? '/seller' : '/',
        'Success!',
        'Please check your email for a confirmation link. You may now close this tab.'
      )
    : getErrorRedirect(
        type === 'seller' ? '/auth/register?type=seller' : '/auth/register',
        'Sign up failed.',
        'You could not be signed in.'
      );
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
