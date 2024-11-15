import { SupabaseClient } from '@supabase/supabase-js'
import { cache } from 'react'

export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user }
  } = await supabase.auth.getUser()
  return user
})

export const getUserData = cache(async (supabase: SupabaseClient) => {
  const user = await getUser(supabase)

  if (!user) {
    return null
  }

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  return userData
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
