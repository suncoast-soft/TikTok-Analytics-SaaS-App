import { saveCreatorAuth } from '../supabase/mutations';
import { createClient } from '../supabase/server';
import { getCreator } from '../supabase/queries';

const {
  TIKTOK_API_BASE_URL,
  TIKTOK_AUTH_REDIRECT_URL,
  TIKTOK_AUTH_CLIENT_KEY,
  TIKTOK_AUTH_CLIENT_SECRET
} = process.env;

export const generateCreatorAccessToken = async (code: string) => {
  const supabase = await createClient();

  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  const body = new URLSearchParams();
  body.append('client_key', TIKTOK_AUTH_CLIENT_KEY!);
  body.append('client_secret', TIKTOK_AUTH_CLIENT_SECRET!);
  body.append('code', code);
  body.append('grant_type', 'authorization_code');
  body.append('redirect_uri', TIKTOK_AUTH_REDIRECT_URL!);

  const response = await fetch(`${TIKTOK_API_BASE_URL}/oauth/token/`, {
    method: 'POST',
    body,
    headers,
    redirect: 'follow'
  });

  if (response.status !== 200) {
    return null;
  }

  const data = await response.json();

  const {
    access_token,
    expires_in: access_token_expire_in,
    refresh_token,
    refresh_expires_in
  } = data;

  const currentTime = Date.now();
  const access_token_expire_at = currentTime + access_token_expire_in - 1000;
  const refresh_token_expire_at = currentTime + refresh_expires_in - 1000;

  const creatorAuth = await saveCreatorAuth(supabase, {
    access_token,
    access_token_expire_at,
    refresh_token,
    refresh_token_expire_at
  });

  if (!creatorAuth) return null;

  return creatorAuth;
};

export const refreshCreatorAccessToken = async () => {
  const supabase = await createClient();

  const authData = await getCreator(supabase);
  if (!authData) throw new Error('No token data found.');

  const { refresh_token } = authData;

  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  const body = new URLSearchParams();
  body.append('client_key', TIKTOK_AUTH_CLIENT_KEY!);
  body.append('client_secret', TIKTOK_AUTH_CLIENT_SECRET!);
  body.append('grant_type', 'refresh_token');
  body.append('refresh_token', refresh_token);

  const response = await fetch(`${TIKTOK_API_BASE_URL}/oauth/token/`, {
    method: 'POST',
    body,
    headers,
    redirect: 'follow'
  });

  if (response.status !== 200) {
    return null;
  }

  const data = await response.json();

  const {
    access_token,
    expires_in: access_token_expire_in,
    refresh_token: new_refresh_token,
    refresh_expires_in
  } = data;

  const currentTime = Date.now();
  const access_token_expire_at = currentTime + access_token_expire_in - 1000;
  const refresh_token_expire_at = currentTime + refresh_expires_in - 1000;

  const creatorAuth = await saveCreatorAuth(supabase, {
    access_token,
    access_token_expire_at,
    refresh_token: new_refresh_token,
    refresh_token_expire_at
  });

  return creatorAuth;
};

export const getCreatorAccessToken = async () => {
  const supabase = await createClient();

  const authData = await getCreator(supabase);
  if (!authData) return null;

  const { access_token, access_token_expire_at, refresh_token_expire_at } =
    authData;

  const currentTime = Date.now();

  if (currentTime >= access_token_expire_at) {
    if (currentTime >= refresh_token_expire_at) return null;

    const refreshedToken = await refreshCreatorAccessToken();
    if (!refreshedToken) return null;

    return refreshedToken.access_token;
  }

  return access_token;
};
