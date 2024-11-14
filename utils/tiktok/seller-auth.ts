import { Tables } from '@/types_db'
import { getSellerAuth, saveSellerAuth } from '../supabase/mutations'
import { createClient } from '../supabase/server'

const {
  TIKTOK_AUTH_BASE,
  TIKTOK_AUTH_PATH,
  TIKTOK_APP_KEY,
  TIKTOK_APP_SECRET
} = process.env

export const generateAccessToken = async (auth_code: string) => {
  const supabase = createClient()

  const myHeaders = new Headers()
  myHeaders.append('content-type', 'application/json')

  const params = {
    app_key: TIKTOK_APP_KEY!,
    app_secret: TIKTOK_APP_SECRET!,
    auth_code,
    grant_type: 'authorized_code'!
  }
  const urlSearchParams = new URLSearchParams(params)

  const response = await fetch(
    `${TIKTOK_AUTH_BASE}/${TIKTOK_AUTH_PATH}?${urlSearchParams}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }
  )

  const data = await response.json()
  const {
    access_token,
    access_token_expire_in,
    refresh_token,
    refresh_token_expire_in,
    seller_name
  } = data.data

  const currentTime = new Date().getTime()
  const access_token_expire_at = currentTime + access_token_expire_in - 1000
  const refresh_token_expire_at = currentTime + refresh_token_expire_in - 1000

  const sellerAuth = await saveSellerAuth(supabase, {
    access_token,
    access_token_expire_at,
    refresh_token,
    refresh_token_expire_at,
    seller_name
  })
  return sellerAuth
}

export const refreshAccessToken = async (refresh_token: string) => {
  const supabase = createClient()

  const myHeaders = new Headers()
  myHeaders.append('content-type', 'application/json')

  const params = {
    app_key: TIKTOK_APP_KEY!,
    app_secret: TIKTOK_APP_SECRET!,
    refresh_token,
    grant_type: 'refresh_token'
  }
  const urlSearchParams = new URLSearchParams(params)

  const response = await fetch(
    `${TIKTOK_AUTH_BASE}/${TIKTOK_AUTH_PATH}?${urlSearchParams}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }
  )

  const data = await response.json()
  const {
    access_token,
    access_token_expire_in,
    refresh_token: new_refresh_token,
    refresh_token_expire_in,
    seller_name
  } = data.data

  const currentTime = new Date().getTime()
  const access_token_expire_at = currentTime + access_token_expire_in - 1000
  const refresh_token_expire_at = currentTime + refresh_token_expire_in - 1000

  const sellerAuth = await saveSellerAuth(supabase, {
    access_token,
    access_token_expire_at,
    refresh_token: new_refresh_token,
    refresh_token_expire_at,
    seller_name
  })
  return sellerAuth
}

export const getAccessToken = async () => {
  const supabase = createClient()

  const authData = await getSellerAuth(supabase)

  if (!authData) {
    throw new Error('No token data found.')
  }

  let {
    access_token,
    access_token_expire_at,
    refresh_token,
    refresh_token_expire_at
  } = authData
  const currentTime = new Date().getTime()

  if (currentTime >= access_token_expire_at) {
    if (currentTime >= refresh_token_expire_at) {
      return null
    }

    const refreshedToken = await refreshAccessToken(refresh_token)
    if (!refreshedToken) {
      return null
    }

    return refreshedToken.access_token
  }

  return access_token
}
