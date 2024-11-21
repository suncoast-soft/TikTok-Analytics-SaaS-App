import { SupabaseClient } from '@supabase/supabase-js'
import { cache } from 'react'

export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  return { ...data, auth: user }
})

export const getSubscription = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase)

  if (!user) {
    return null
  }

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*, users(*)')
    .in('status', ['trialing', 'active'])
    .eq('user_id', user.id)
    .single()

  return subscription
})

export const getSeller = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase)

  if (!user) {
    return null
  }

  const { data: seller, error } = await supabase
    .from('sellers')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) {
    console.error('Failed to fetch seller auth:', error)
    return null
  }

  return seller
})
