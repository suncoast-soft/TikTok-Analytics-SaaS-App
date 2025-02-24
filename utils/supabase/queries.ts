import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';

export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return user;
});

export const getUserData = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase);
  if (!user) return null;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Failed to fetch user data', error);
    return null;
  }

  return data;
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

export const getSeller = cache(
  async (supabase: SupabaseClient, sellerName?: string) => {
    if (sellerName) {
      const { data: seller, error } = await supabase
        .from('sellers')
        .select('*')
        .eq('seller_name', sellerName)
        .single();

      if (error) {
        console.error('Failed to fetch seller auth:', error);
        return null;
      }

      return seller;
    } else {
      const user = await getUser(supabase);

      if (!user) {
        return null;
      }

      // if (!user || user.type !== 'seller') {
      //   return null;
      // }

      const { data: seller, error } = await supabase
        .from('sellers')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Failed to fetch seller auth:', error);
        return null;
      }

      return seller;
    }
  }
);

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
