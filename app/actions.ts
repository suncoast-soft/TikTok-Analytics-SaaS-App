'use server'

import { requestTikTokShopAPI } from '@/utils/tiktok/utils'
import { cookies } from 'next/headers'

interface APIParams {
  [key: string]: string | number
}

export async function requestTikTokShopAPIClient(
  seller: string | undefined,
  api_path: string,
  params: APIParams = {},
  method: string = 'GET',
  body: string = ''
) {
  return requestTikTokShopAPI(seller, api_path, params, method, body)
}

export async function SelectSellerAction(seller_name: string) {
  const cookieStore = await cookies()
  const currentSeller = cookieStore.get('seller')
  if (currentSeller?.value !== seller_name) {
    cookieStore.set('seller', seller_name)
  }
  return true
}
