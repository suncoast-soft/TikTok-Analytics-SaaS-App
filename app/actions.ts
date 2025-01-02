'use server'

import { requestTikTokShopAPI } from '@/utils/tiktok/utils'

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
