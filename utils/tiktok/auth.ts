import { saveTikTokAuth } from '../supabase/mutations';
import { createClient } from '../supabase/server';
import { getUser } from '../supabase/queries';
import { generateSign } from './utils';

const {
  TIKTOK_PARTNER_APP_KEY,
  TIKTOK_PARTNER_APP_SECRET,
  TIKTOK_TOKEN_BASE_URL,
  TIKTOK_API_BASE_URL
} = process.env;

async function getTikTokShopCipher(access_token: string) {
  const api_path = '/authorization/202309/shops';

  const requestOptions = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-tts-access-token': access_token
    }
  };

  const signature = generateSign(
    api_path,
    {
      app_key: TIKTOK_PARTNER_APP_KEY!,
      timestamp: ((Date.now() / 1000) | 0).toString()
    },
    requestOptions,
    TIKTOK_PARTNER_APP_SECRET!
  );

  const urlSearchParams = new URLSearchParams({
    app_key: TIKTOK_PARTNER_APP_KEY!,
    timestamp: ((Date.now() / 1000) | 0).toString(),
    sign: signature
  });

  const fetchURL = `${TIKTOK_API_BASE_URL}/${api_path}?${urlSearchParams.toString()}`;

  try {
    const response = await fetch(fetchURL, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      console.log(`HTTP error! Status: ${response.status}`);
      console.log(data);
      return null;
    }

    return data;
  } catch (error) {
    console.log('Request failed:', error);
    return null;
  }
}

export const generateAccessToken = async (auth_code: string) => {
  const supabase = await createClient();

  const user = await getUser(supabase);
  if (!user) {
    return null;
  }

  const myHeaders = new Headers({ 'content-type': 'application/json' });

  const params = {
    app_key: TIKTOK_PARTNER_APP_KEY!,
    app_secret: TIKTOK_PARTNER_APP_SECRET!,
    auth_code,
    grant_type: 'authorized_code'
  };

  const urlSearchParams = new URLSearchParams(params);

  const response = await fetch(
    `${TIKTOK_TOKEN_BASE_URL}/get?${urlSearchParams}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }
  );

  const data = await response.json();
  if (!data.data) return null;

  const {
    access_token,
    access_token_expire_in,
    refresh_token,
    refresh_token_expire_in,
    seller_name,
    user_type
  } = data.data;

  const currentTime = Date.now();
  const access_token_expire_at = currentTime + access_token_expire_in - 1000;
  const refresh_token_expire_at = currentTime + refresh_token_expire_in - 1000;

  let shop_cipher = null;
  let seller_id = null;
  if (user_type === 0) {
    const shopCipherData = await getTikTokShopCipher(access_token);
    const shop = shopCipherData.data.shops.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (s: any) => s.name === seller_name
    );
    shop_cipher = shop?.cipher;
    seller_id = shop?.id;
  }

  const auth = await saveTikTokAuth(supabase, {
    type: user_type === 0 ? 'seller' : user_type === 1 ? 'creator' : null,
    access_token,
    access_token_expire_at,
    refresh_token,
    refresh_token_expire_at,
    seller_name,
    shop_cipher,
    seller_id
  });

  if (!auth) return null;

  return auth;
};

export const refreshAccessToken = async (refresh_token: string) => {
  const supabase = await createClient();

  const myHeaders = new Headers({ 'content-type': 'application/json' });

  const params = {
    app_key: TIKTOK_PARTNER_APP_KEY!,
    app_secret: TIKTOK_PARTNER_APP_SECRET!,
    refresh_token,
    grant_type: 'refresh_token'
  };
  const urlSearchParams = new URLSearchParams(params);

  const response = await fetch(
    `${TIKTOK_TOKEN_BASE_URL}/refresh?${urlSearchParams}`,
    {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }
  );

  const data = await response.json();
  if (!data.data) return null;

  const {
    access_token,
    access_token_expire_in,
    refresh_token: new_refresh_token,
    refresh_token_expire_in,
    seller_name
  } = data.data;

  const currentTime = Date.now();
  const access_token_expire_at = currentTime + access_token_expire_in - 1000;
  const refresh_token_expire_at = currentTime + refresh_token_expire_in - 1000;

  const auth = await saveTikTokAuth(supabase, {
    access_token,
    access_token_expire_at,
    refresh_token: new_refresh_token,
    refresh_token_expire_at,
    seller_name
  });

  return auth;
};

export const getAccessToken = async () => {
  const supabase = await createClient();

  const authData = await getUser(supabase);
  if (!authData) {
    console.log('No token data found.');
    return null;
  }

  const {
    type,
    access_token,
    access_token_expire_at,
    refresh_token,
    refresh_token_expire_at,
    shop_cipher
  } = authData;
  const currentTime = Date.now();

  if (currentTime >= access_token_expire_at) {
    if (currentTime >= refresh_token_expire_at) return null;

    const refreshedToken = await refreshAccessToken(refresh_token);
    if (!refreshedToken) return null;

    return { type, access_token: refreshedToken.access_token, shop_cipher };
  }

  return { type, access_token, shop_cipher };
};
