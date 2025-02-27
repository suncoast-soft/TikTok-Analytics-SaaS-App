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

export const getSellers = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase);

  if (!user) {
    return [];
  }

  const { data: sellers, error } = await supabase.from('sellers').select('*');

  if (error) {
    console.error('Failed to fetch sellers', error);
    return [];
  }

  return sellers;
});

export const getSeller = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase);

  if (!user) {
    return null;
  }

  // Temporary
  if (user.type === 'creator') {
    const { data: sellers } = await supabase.from('sellers').select('*');
    return sellers?.[0];
  }

  const { data: seller, error } = await supabase
    .from('sellers')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.log('Failed to fetch seller auth:', error);
    return null;
  }

  return seller;
});

export const getCreator = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase);

  if (!user) {
    return null;
  }

  const { data: creator, error } = await supabase
    .from('creators')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.log('Failed to fetch creator auth:', error);
    return null;
  }

  return creator;
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
