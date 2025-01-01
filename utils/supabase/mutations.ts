import { Tables } from '@/types_db'
import { SupabaseClient } from '@supabase/supabase-js'
import { cache } from 'react'

type Seller = Partial<Tables<'sellers'>>

export const saveSeller = cache(
  async (supabase: SupabaseClient, auth_data: Seller) => {
    if (auth_data.seller_name) {
      const { data: seller, error: error } = await supabase
        .from('sellers')
        .update({ ...auth_data })
        .eq('seller_name', auth_data.seller_name)
        .select('*')
        .single()

      if (error) {
        console.error('Failed to update seller auth:', error)
        return null
      }

      return seller
    } else if (auth_data.user_id) {
      const { data: seller, error } = await supabase
        .from('sellers')
        .insert({
          ...auth_data
        })
        .select('*')
        .single()

      if (error) {
        console.error('Failed to upsert seller auth:', error)
        return null
      }

      return seller
    } else {
      return null
    }
  }
)
