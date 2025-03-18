import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';

export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (userError) {
    console.error('Failed to fetch user data', userError);
    return null;
  }

  return { ...user, ...userData };
});

export const getCampaigns = cache(async (supabase: SupabaseClient) => {
  const { data: campaigns, error } = await supabase
    .from('campaigns')
    .select('*');

  if (error) {
    console.error('Failed to fetch campaigns', error);
    return [];
  }

  return campaigns;
});

export const getCampaign = cache(
  async (supabase: SupabaseClient, campaignId: string) => {
    const { data: campaign, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('id', campaignId)
      .single();

    if (error) {
      console.log('Failed to fetch campaign', error);
      return null;
    }

    return campaign;
  }
);
