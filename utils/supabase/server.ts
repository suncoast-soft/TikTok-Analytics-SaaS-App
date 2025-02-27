'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { deleteCreatorAuth, saveCampaign } from './mutations';
import { getErrorRedirect, getStatusRedirect, getURL } from '../helpers';
import { Tables } from '@/types/db';

type Campaign = Partial<Tables<'campaigns'>>;

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

export async function saveCampaignMutation(campaignData: Campaign) {
  const supabase = await createClient();

  const campaign = await saveCampaign(supabase, campaignData);

  if (campaign) {
    return getStatusRedirect(
      getURL(`/seller/campaigns/${campaignData.id}`),
      'Success!',
      `Your Campaign has been updated successfully.`
    );
  } else {
    return getErrorRedirect(
      getURL(`/seller/campaigns/${campaignData.id}`),
      'Error!',
      `Failed updating your Campaign. Please try again`
    );
  }
}
