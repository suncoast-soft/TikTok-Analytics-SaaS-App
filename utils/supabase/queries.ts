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
    .select('*, users(seller_name)');

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
      .select('*, users(seller_name)')
      .eq('campaign_id', campaignId)
      .single();

    if (error) {
      console.log('Failed to fetch campaign', error);
      return null;
    }

    return campaign;
  }
);

export const getAllSellerOrders = cache(async (supabase: SupabaseClient) => {
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*, campaigns(*)');

  if (error) {
    console.log('Failed to fetch orders', error);
    return null;
  }

  return orders;
});

export const getSellerOrders = cache(
  async (supabase: SupabaseClient, campaignId: string) => {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*, campaigns(*)')
      .eq('campaign_id', campaignId);

    if (error) {
      console.log('Failed to fetch orders', error);
      return null;
    }

    return orders;
  }
);

export const getAllCreatorOrders = cache(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (supabase: SupabaseClient, creatorUsername: string | null) => {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*, campaigns(*)');
    // .eq('creator_username', creatorUsername); // Temporary

    if (error) {
      console.log('Failed to fetch orders', error);
      return null;
    }

    return orders;
  }
);

export const getCreatorOrders = cache(
  async (
    supabase: SupabaseClient,
    campaignId: string,
    creatorUsername: string | null
  ) => {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*, campaigns(*)')
      .eq('campaign_id', campaignId)
      .eq('creator_username', creatorUsername);

    if (error) {
      console.log('Failed to fetch orders', error);
      return null;
    }

    return orders;
  }
);

export const getSellerVideos = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: videos, error } = await supabase
    .from('videos')
    .select('*')
    .eq('seller_id', user.id);

  if (error) {
    console.log('Failed to fetch videos', error);
    return null;
  }

  return videos;
});

export const getCreatorVideos = cache(
  async (supabase: SupabaseClient, creatorUsername: string | null) => {
    const { data: videos, error } = await supabase
      .from('videos')
      .select('*')
      .limit(100)
      .eq('creator_username', creatorUsername);

    if (error) {
      console.log('Failed to fetch videos', error);
      return null;
    }

    return videos;
  }
);
