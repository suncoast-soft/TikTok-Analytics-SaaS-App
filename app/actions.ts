'use server'

import { requestTikTokShopAPI } from '@/utils/tiktok/utils'

interface APIParams {
  [key: string]: string | number
}

export async function requestTikTokShopAPIClient(
  api_path: string,
  params: APIParams = {},
  method: string = 'GET',
  body: string = ''
) {
  return requestTikTokShopAPI(api_path, params, method, body)
}
