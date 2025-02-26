'use server';

import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';
import { Tables } from '@/types_db';
import { getUser } from './queries';

type User = Partial<Tables<'users'>>;
type Seller = Partial<Tables<'sellers'>>;
type Creator = Partial<Tables<'creators'>>;

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

export const saveSellerAuth = cache(
  async (supabase: SupabaseClient, auth_data: Seller) => {
    const user = await getUser(supabase);
    if (!user) return null;

    const { data: seller, error } = await supabase
      .from('sellers')
      .upsert({ ...auth_data, user_id: user.id })
      .eq('user_id', user.id)
      .select('*')
      .single();

    if (error) {
      console.error('Failed to upsert seller auth:', error);
      return null;
    }

    return seller;
  }
);

export const saveCreatorAuth = cache(
  async (supabase: SupabaseClient, auth_data: Creator) => {
    const user = await getUser(supabase);
    if (!user) return null;

    const { data: creator, error: error } = await supabase
      .from('creators')
      .upsert({ ...auth_data, user_id: user.id })
      .eq('user_id', user.id)
      .select('*')
      .single();

    if (error) {
      console.error('Failed to upsert creator auth:', error);
      return null;
    }

    return creator;
  }
);

export const deleteCreatorAuth = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase);
  if (!user) return null;

  const { error: error } = await supabase
    .from('creators')
    .delete()
    .eq('user_id', user.id);

  if (error) {
    console.error('Failed to upsert creator auth:', error);
    return false;
  }

  return true;
});
