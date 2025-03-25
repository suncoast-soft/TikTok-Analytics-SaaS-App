import * as crypto from 'crypto';
import { getAccessToken } from './auth';

const {
  TIKTOK_PARTNER_APP_KEY,
  TIKTOK_PARTNER_APP_SECRET,
  TIKTOK_API_BASE_URL
} = process.env;

interface APIParams {
  [key: string]: string | number;
}

interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: BodyInit | null | undefined;
}

interface TikTokAPIRequestParams {
  api_path: string;
  method?: 'GET' | 'POST';
  headers?: APIParams;
  params?: APIParams;
  body?: BodyInit | null;
  access_token?: string;
  shop_cipher?: string;
}

export const generateSign = (
  apiPath: string,
  params: APIParams,
  options: RequestOptions,
  app_secret: string
) => {
  const sortedParams = Object.keys(params)
    .filter((key) => !['access_token', 'sign'].includes(key as string))
    .sort()
    .map((key) => `${key}${params[key]}`)
    .join('');

  let signString = `${apiPath}${sortedParams}`;

  if (
    options.headers?.['content-type'] !== 'multipart/form-data' &&
    options.body
  ) {
    signString += options.body;
  }

  signString = `${app_secret}${signString}${app_secret}`;

  const hmac = crypto.createHmac('sha256', app_secret);
  hmac.update(signString);
  return hmac.digest('hex');
};

export async function requestTikTokShopAPI({
  api_path,
  method = 'GET',
  params = {},
  body,
  access_token,
  shop_cipher
}: TikTokAPIRequestParams) {
  const timestamp = ((Date.now() / 1000) | 0).toString();

  let token = access_token;
  let cipher = shop_cipher;

  if (!token) {
    const authData = await getAccessToken();
    if (!authData) return null;

    token = authData.access_token;
    if (
      authData.type === 'seller' &&
      api_path != '/authorization/202309/shops'
    ) {
      cipher = authData.shop_cipher;
    }
  }

  const defaultParams: Record<string, string> = {
    app_key: TIKTOK_PARTNER_APP_KEY!,
    timestamp
  };

  if (cipher) {
    defaultParams.shop_cipher = cipher;
  }

  const allParams = {
    ...defaultParams,
    ...params
  };

  const requestOptions: RequestOptions = {
    method,
    headers: {
      'content-type': 'application/json',
      'x-tts-access-token': token!
    }
  };

  if (method === 'POST' && body) {
    requestOptions.body = body;
  }

  const signature = generateSign(
    api_path,
    allParams,
    requestOptions,
    TIKTOK_PARTNER_APP_SECRET!
  );

  const urlParams = new URLSearchParams({
    ...allParams,
    sign: signature
  });

  const fetchURL = `${TIKTOK_API_BASE_URL}/${api_path}?${urlParams.toString()}`;

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
