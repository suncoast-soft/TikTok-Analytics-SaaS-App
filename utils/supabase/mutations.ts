import { Tables } from '@/types_db'
import { SupabaseClient } from '@supabase/supabase-js'
import { cache } from 'react'
import { getUser } from './queries'

type Seller = Partial<Tables<'sellers'>>

export const saveSeller = cache(
  async (supabase: SupabaseClient, auth_data: Seller) => {
    const user = await getUser(supabase)

    if (!user) {
      return null
    }

    const { data: seller, error } = await supabase
      .from('sellers')
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
