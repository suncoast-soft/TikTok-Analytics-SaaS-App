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

export async function requestTikTokShopAPI(
  api_path: string,
  params: APIParams = {},
  method: string = 'GET',
  body: BodyInit | null | undefined
) {
  const authData = await getAccessToken();

  if (!authData) {
    return null;
  }

  const requestOptions: RequestOptions = {
    method: method,
    headers: {
      'content-type': 'application/json',
      'x-tts-access-token': authData.access_token
    }
  };
  if (method === 'POST') {
    requestOptions.body = body;
  }

  const defaultParams: {
    app_key: string;
    timestamp: string;
    shop_cipher?: string;
  } = {
    app_key: TIKTOK_PARTNER_APP_KEY!,
    timestamp: ((Date.now() / 1000) | 0).toString()
  };
  if (api_path !== '/authorization/202309/shops') {
    defaultParams.shop_cipher = authData.shop_cipher;
  }

  const urlSearchParams = new URLSearchParams({
    ...defaultParams,
    ...params
  } as Record<string, string>);

  const signature = generateSign(
    api_path,
    {
      ...defaultParams,
      ...params
    },
    requestOptions,
    TIKTOK_PARTNER_APP_SECRET!
  );
  urlSearchParams.append('sign', signature);

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
