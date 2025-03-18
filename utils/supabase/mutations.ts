'use server';

import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';
import { Tables } from '@/types/db';
import { getUser } from './queries';

type User = Partial<Tables<'users'>>;
type Campaign = Partial<Tables<'campaigns'>>;

export const updateUser = cache(
  async (supabase: SupabaseClient, user_data: User) => {
    const user = await getUser(supabase);
    if (!user) return null;

    const { data, error } = await supabase
      .from('users')
      .update(user_data)
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Failed to upsert seller auth:', error);
      return null;
    }

    return data;
  }
);

export const saveTikTokAuth = cache(
  async (supabase: SupabaseClient, auth_data: User) => {
    const user = await getUser(supabase);
    if (!user) return null;

    const { data: auth, error } = await supabase
      .from('users')
      .update(auth_data)
      .eq('user_id', user.id)
      .select('*')
      .single();

    if (error) {
      console.error('Failed to update auth data:', error);
      return null;
    }

    return auth;
  }
);

export const deleteTikTokAuth = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase);
  if (!user) return null;

  const { data: auth, error: error } = await supabase
    .from('users')
    .update({ access_token: null, refresh_token: null })
    .eq('user_id', user.id)
    .select('*')
    .single();

  if (error) {
    console.error('Failed to erase auth data:', error);
    return false;
  }

  return auth;
});

export const saveCampaign = cache(
  async (supabase: SupabaseClient, campaign_data: Campaign) => {
    const { data: campaign, error: error } = await supabase
      .from('campaigns')
      .upsert(campaign_data)
      .eq('id', campaign_data.id)
      .select('*')
      .single();

    if (error) {
      console.error('Failed to upsert campaign data:', error);
      return null;
    }

    return campaign;
  }
);
