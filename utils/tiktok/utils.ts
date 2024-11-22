// Import necessary modules
import * as crypto from 'crypto'
import { createClient } from '../supabase/server'
import { getSeller } from '../supabase/queries'

// Environment variables
const { TIKTOK_APP_KEY, TIKTOK_APP_SECRET, TIKTOK_SHOP_BASE } = process.env

// Define types for API parameters and request options
interface APIParams {
  [key: string]: string | number
}

interface RequestOptions {
  method?: string
  headers?: Record<string, string>
  body?: string
}

// Keys to exclude from signing process
const excludeKeys = ['access_token', 'sign'] as const

/**
 * Generates a secure signature for TikTok Shop API requests.
 * @param apiPath - The endpoint path of the API.
 * @param params - Query parameters to be signed.
 * @param options - HTTP request options including headers and body.
 * @param app_secret - Application secret used for HMAC hashing.
 * @returns The generated signature in hexadecimal format.
 */
export const generateSign = (
  apiPath: string,
  params: APIParams,
  options: RequestOptions,
  app_secret: string
) => {
  // Sort and filter parameters, then construct the signing string
  const sortedParams = Object.keys(params)
    .filter((key) => !excludeKeys.includes(key as any))
    .sort()
    .map((key) => `${key}${params[key]}`)
    .join('')

  let signString = `${apiPath}${sortedParams}`

  // Append body content to signing string if not multipart/form-data
  if (
    options.headers?.['content-type'] !== 'multipart/form-data' &&
    options.body &&
    Object.keys(options.body).length > 0
  ) {
    const body = JSON.stringify(options.body)
    signString += body
  }

  // Finalize the signing string by adding application secrets
  signString = `${app_secret}${signString}${app_secret}`

  // Create HMAC hash using SHA256 and return the hexadecimal digest
  const hmac = crypto.createHmac('sha256', app_secret)
  hmac.update(signString)
  return hmac.digest('hex')
}

/**
 * Makes a request to the TikTok Shop API with authentication handling.
 * @param api_path - The endpoint path of the API.
 * @param params - Optional query parameters for the request.
 * @returns The response data from the API or null if the request fails.
 */
export async function requestTikTokShopAPI(
  api_path: string,
  params: APIParams = {},
  method: string = 'GET'
) {
  const supabase = createClient()
  const authData = await getSeller(supabase)

  if (!authData) {
    return null
  }

  // Setup request headers with access token for authentication
  const requestOptions: RequestOptions = {
    method: method,
    headers: {
      'content-type': 'application/json',
      'x-tts-access-token': authData.access_token
    }
  }

  // Initialize default parameters with necessary keys
  const defaultParams: {
    app_key: string
    timestamp: string
    shop_cipher?: string
  } = {
    app_key: TIKTOK_APP_KEY!,
    timestamp: ((Date.now() / 1000) | 0).toString()
  }
  // Conditionally include `shop_cipher` based on API path
  if (api_path !== '/authorization/202309/shops') {
    defaultParams.shop_cipher = authData.shop_cipher
  }

  const urlSearchParams = new URLSearchParams({
    ...defaultParams,
    ...params
  } as Record<string, string>)

  // Generate and append the signature to the query parameters
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
    // Make an HTTP GET request to the TikTok Shop API
    const response = await fetch(fetchURL, requestOptions)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    // Parse and return the JSON response
    return await response.json()
  } catch (error) {
    console.error('Request failed:', error)
    return null
  }
}
