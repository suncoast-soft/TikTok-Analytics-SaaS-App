import * as crypto from 'crypto';
import { getSellerAccessToken } from './seller-auth';
import { getCreatorAccessToken } from './creator-auth';

const {
  TIKTOK_APP_KEY,
  TIKTOK_APP_SECRET,
  TIKTOK_SHOP_BASE,
  TIKTOK_API_BASE_URL
} = process.env;

interface APIParams {
  [key: string]: string | number;
}

interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

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
  const sortedParams = Object.keys(params)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((key) => !['access_token', 'sign'].includes(key as any))
    .sort()
    .map((key) => `${key}${params[key]}`)
    .join('');

  let signString = `${apiPath}${sortedParams}`;

  if (
    options.headers?.['content-type'] !== 'multipart/form-data' &&
    options.body &&
    Object.keys(options.body).length > 0
  ) {
    const body = JSON.stringify(options.body);
    signString += body;
  }

  signString = `${app_secret}${signString}${app_secret}`;

  const hmac = crypto.createHmac('sha256', app_secret);
  hmac.update(signString);
  return hmac.digest('hex');
};

/**
 * Makes a request to the TikTok Shop API with authentication handling.
 * @param api_path - The endpoint path of the API.
 * @param params - Optional query parameters for the request.
 * @returns The response data from the API or null if the request fails.
 */
export async function requestTikTokShopAPI(
  seller: string | undefined,
  api_path: string,
  params: APIParams = {},
  method: string = 'GET',
  body: string = ''
) {
  const authData = await getSellerAccessToken(seller);

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
    app_key: TIKTOK_APP_KEY!,
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
    TIKTOK_APP_SECRET!
  );
  urlSearchParams.append('sign', signature);

  const fetchURL = `${TIKTOK_SHOP_BASE}/${api_path}?${urlSearchParams.toString()}`;

  try {
    const response = await fetch(fetchURL, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Request failed:', error);
    return null;
  }
}

/**
 * Makes a request to the TikTok Shop API with authentication handling.
 * @param api_path - The endpoint path of the API.
 * @param params - Optional query parameters for the request.
 * @returns The response data from the API or null if the request fails.
 */
export async function requestTikTokAPI(
  api_path: string,
  params: APIParams = {}
) {
  const accessToken = await getCreatorAccessToken();

  if (!accessToken) {
    return null;
  }

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${accessToken}`);

  const urlSearchParams = new URLSearchParams(params as Record<string, string>);

  const response = await fetch(
    `${TIKTOK_API_BASE_URL}/${api_path}/?${urlSearchParams}`,
    {
      method: 'GET',
      headers,
      redirect: 'follow'
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.data;
}
