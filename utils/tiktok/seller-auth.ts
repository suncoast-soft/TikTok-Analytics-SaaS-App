// Imports from Supabase and utility modules
import { saveSeller } from '../supabase/mutations'
import { createClient } from '../supabase/server'
import { getSeller, getUser } from '../supabase/queries'
import { requestTikTokShopAPI } from './utils'

// Environment variables
const { TIKTOK_AUTH_BASE, TIKTOK_APP_KEY, TIKTOK_APP_SECRET } = process.env

/**
 * Generate a new access token using the provided authorization code.
 * @param auth_code - The code received to authorize access.
 * @returns Updated seller authentication data or null if unsuccessful.
 */
export const generateAccessToken = async (auth_code: string) => {
  const supabase = await createClient()

  const user = await getUser(supabase)
  if (!user) {
    return null
  }

  // Headers for the API request
  const myHeaders = new Headers({ 'content-type': 'application/json' })

  // Parameters for the access token request
  const params = {
    app_key: TIKTOK_APP_KEY!,
    app_secret: TIKTOK_APP_SECRET!,
    auth_code,
    grant_type: 'authorized_code'
  }

  const urlSearchParams = new URLSearchParams(params)

  // Fetch access token from TikTok API
  const response = await fetch(
    `${TIKTOK_AUTH_BASE}/api/v2/token/get?${urlSearchParams}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }
  )

  const data = await response.json()
  if (!data.data) return null

  const {
    access_token,
    access_token_expire_in,
    refresh_token,
    refresh_token_expire_in,
    seller_name
  } = data.data

  const currentTime = Date.now()
  const access_token_expire_at = currentTime + access_token_expire_in - 1000
  const refresh_token_expire_at = currentTime + refresh_token_expire_in - 1000

  // Save seller's token information in the database
  const sellerAuth = await saveSeller(supabase, {
    user_id: user.id,
    access_token,
    access_token_expire_at,
    refresh_token,
    refresh_token_expire_at,
    seller_name
  })

  if (!sellerAuth) return null

  // Retrieve shop cipher data
  const shopCipherData = await requestTikTokShopAPI(
    '/authorization/202309/shops'
  )
  const shop = shopCipherData.data.shops.find(
    (s: any) => s.name === seller_name
  )
  const shop_cipher = shop ? shop.cipher : null

  // Update seller's information with shop cipher
  const updatedSellerAuth = await saveSeller(supabase, {
    shop_cipher,
    seller_name
  })

  return updatedSellerAuth
}

/**
 * Refresh the access token using the provided refresh token.
 * @param refresh_token - The refresh token for obtaining new access tokens.
 * @returns Refreshed seller authentication data.
 */
export const refreshAccessToken = async (refresh_token: string) => {
  const supabase = await createClient()

  const myHeaders = new Headers({ 'content-type': 'application/json' })

  const params = {
    app_key: TIKTOK_APP_KEY!,
    app_secret: TIKTOK_APP_SECRET!,
    refresh_token,
    grant_type: 'refresh_token'
  }
  const urlSearchParams = new URLSearchParams(params)

  // Fetch refreshed access token from TikTok API
  const response = await fetch(
    `${TIKTOK_AUTH_BASE}/api/v2/token/refresh?${urlSearchParams}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }
  )

  const data = await response.json()
  if (!data.data) return null

  const {
    access_token,
    access_token_expire_in,
    refresh_token: new_refresh_token,
    refresh_token_expire_in,
    seller_name
  } = data.data

  const currentTime = Date.now()
  const access_token_expire_at = currentTime + access_token_expire_in - 1000
  const refresh_token_expire_at = currentTime + refresh_token_expire_in - 1000

  // Save the newly fetched tokens
  const sellerAuth = await saveSeller(supabase, {
    access_token,
    access_token_expire_at,
    refresh_token: new_refresh_token,
    refresh_token_expire_at,
    seller_name
  })

  return sellerAuth
}

/**
 * Retrieve the current access token, refreshing it if necessary.
 * @returns The valid access token or null if unable to obtain one.
 */
export const getAccessToken = async (seller: string) => {
  const supabase = await createClient()

  const authData = await getSeller(supabase, seller)
  if (!authData) throw new Error('No token data found.')

  let {
    access_token,
    access_token_expire_at,
    refresh_token,
    refresh_token_expire_at,
    shop_cipher
  } = authData
  const currentTime = Date.now()

  // Check if the access token is expired and refresh if needed
  if (currentTime >= access_token_expire_at) {
    if (currentTime >= refresh_token_expire_at) return null

    const refreshedToken = await refreshAccessToken(refresh_token)
    if (!refreshedToken) return null

    return refreshedToken.access_token
  }

  return { access_token, shop_cipher }
}
