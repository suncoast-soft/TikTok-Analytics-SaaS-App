'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { deleteCreatorAuth } from './mutations';
import { getErrorRedirect, getStatusRedirect, getURL } from '../helpers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        }
      }
    }
  );
}

export async function deleteCreatorAuthMutation() {
  const supabase = await createClient();

  const deleted = await deleteCreatorAuth(supabase);

  if (deleted) {
    return getStatusRedirect(
      getURL('/creator/account'),
      'Success!',
      `Your TikTok account has been successfully disconnected.`
    );
  } else {
    return getErrorRedirect(
      getURL('/creator/account'),
      'Error!',
      `Failed unlinking your TikTok Account. Please try again`
    );
  }
}
