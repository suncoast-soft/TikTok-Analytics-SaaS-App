import * as crypto from 'crypto'
import { createClient } from '../supabase/server'
import { getSeller } from '../supabase/queries'

const { TIKTOK_APP_KEY, TIKTOK_APP_SECRET, TIKTOK_SHOP_BASE } = process.env

interface APIParams {
  [key: string]: string | number
}

interface RequestOptions {
  method?: string
  headers?: Record<string, string>
  body?: string
}

const excludeKeys = ['access_token', 'sign'] as const
export const generateSign = (
  apiPath: string,
  params: APIParams,
  options: RequestOptions,
  app_secret: string
) => {
  let signString = ''
  const sortedParams = Object.keys(params)
    .filter((key) => !excludeKeys.includes(key as any))
    .sort()
    .map((key) => ({ key, value: params[key] }))

  const paramString = sortedParams
    .map(({ key, value }) => `${key}${value}`)
    .join('')

  signString += paramString

  signString = `${apiPath}${paramString}`

  if (
    options.headers?.['content-type'] !== 'multipart/form-data' &&
    options.body &&
    Object.keys(options.body).length
  ) {
    const body = JSON.stringify(options.body)
    signString += body
  }

  signString = `${app_secret}${signString}${app_secret}`

  const hmac = crypto.createHmac('sha256', app_secret)
  hmac.update(signString)
  const sign = hmac.digest('hex')

  return sign
}

export async function requestTikTokShopAPI(
  api_path: string,
  params: APIParams = {}
) {
  const supabase = createClient()
  const authData = await getSeller(supabase)

  if (!authData) {
    return null
  }

  const requestOptions: RequestOptions = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-tts-access-token': authData.access_token
    }
  }

  const defaultParams: {
    app_key: string
    timestamp: string
    shop_cipher?: string
  } = {
    app_key: TIKTOK_APP_KEY!,
    timestamp: Math.floor(Date.now() / 1000).toString()
  }
  if (authData.shop_cipher) {
    defaultParams.shop_cipher = authData.shop_cipher
  }

  const urlSearchParams = new URLSearchParams({
    ...defaultParams,
    ...params
  } as Record<string, string>)

  const signature = generateSign(
    api_path,
    {
      ...defaultParams,
      ...params
    },
    requestOptions,
    TIKTOK_APP_SECRET!
  )
  urlSearchParams.append('sign', signature)

  const fetchURL = `${TIKTOK_SHOP_BASE}/${api_path}?${urlSearchParams.toString()}`

  try {
    const response = await fetch(fetchURL, requestOptions)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.error('Request failed:', error)
    return null
  }
}
