import { saveTikTokAuth } from '../supabase/mutations';
import { createClient } from '../supabase/server';
import { getUser } from '../supabase/queries';
import { requestTikTokShopAPI } from './utils';

const {
  TIKTOK_PARTNER_APP_KEY,
  TIKTOK_PARTNER_APP_SECRET,
  TIKTOK_TOKEN_BASE_URL
} = process.env;

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

  const auth = await saveTikTokAuth(supabase, {
    type: user_type === 0 ? 'seller' : user_type === 1 ? 'creator' : null,
    access_token,
    access_token_expire_at,
    refresh_token,
    refresh_token_expire_at,
    seller_name
  });

  if (!auth) return null;

  if (user_type === 0) {
    const shopCipherData = await requestTikTokShopAPI(
      '/authorization/202309/shops',
      {},
      'GET',
      ''
    );
    const shop = shopCipherData.data.shops.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (s: any) => s.name === seller_name
    );
    const shop_cipher = shop ? shop.cipher : null;
    const seller_id = shop ? shop.id : null;

    const auth = await saveTikTokAuth(supabase, {
      shop_cipher,
      seller_id
    });

    return auth;
  }

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

    return { access_token: refreshedToken.access_token, shop_cipher };
  }

  return { access_token, shop_cipher };
};
