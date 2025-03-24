'use server';

import { requestTikTokShopAPI } from '@/utils/tiktok/utils';
import { cookies } from 'next/headers';

interface APIParams {
  [key: string]: string | number;
}

export async function setCookie(name: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(name, value);
}

export async function requestTikTokShopAPIClient(
  api_path: string,
  params: APIParams = {},
  method: 'GET' | 'POST',
  body: BodyInit | null | undefined
) {
  return requestTikTokShopAPI({ api_path, params, method, body });
}
