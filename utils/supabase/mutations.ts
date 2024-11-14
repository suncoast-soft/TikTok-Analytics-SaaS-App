import { Tables } from '@/types_db'
import { SupabaseClient } from '@supabase/supabase-js'
import { cache } from 'react'

type AuthSellers = Partial<Tables<'sellers'>>

export const saveSellerAuth = cache(
  async (supabase: SupabaseClient, auth_data: AuthSellers) => {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      return null
    }

    const { data: seller, error } = await supabase
      .from('auth_sellers')
      .upsert({
        ...auth_data,
        user_id: user.id
      })
      .select('*')
      .single()

    if (error) {
      console.error('Failed to upsert seller auth:', error)
      return null
    }

    return seller
  }
)

export const getSellerAuth = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: seller, error } = await supabase
    .from('auth_sellers')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) {
    console.error('Failed to fetch seller auth:', error)
    return null
  }

  return seller
})
