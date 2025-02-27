'use client';

import { createClient } from '@/utils/supabase/client';
import { type Provider } from '@supabase/supabase-js';
import { redirectToPath } from './server';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getURL } from '../helpers';
import { Json } from '@/types/db';

interface FormData {
  [key: string]: string | number | boolean | Json;
}

export async function handleRequest(
  formData: FormData,
  requestFunc: (formData: FormData) => Promise<string | void>,
  router: AppRouterInstance | null = null
): Promise<boolean | void> {
  const redirectUrl: string | void = await requestFunc(formData);

  if (router && redirectUrl) {
    return router.push(redirectUrl, { scroll: false });
  } else {
    if (redirectUrl) {
      return await redirectToPath(redirectUrl);
    }
  }
}

export async function signInWithOAuth(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const provider = String(formData.get('provider')).trim() as Provider;
  const type = String(formData.get('type')).trim() as Provider;

  const supabase = createClient();

  await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: getURL(`/auth/callback/supabase?type=${type}`)
    }
  });
}
