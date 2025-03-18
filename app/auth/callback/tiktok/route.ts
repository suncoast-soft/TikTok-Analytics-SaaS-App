import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getErrorRedirect, getStatusRedirect } from '@/utils/helpers';
import { generateAccessToken } from '@/utils/tiktok/auth';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);

  const auth_code = requestUrl.searchParams.get('code');
  const type = requestUrl.searchParams.get('shop_region')
    ? 'seller'
    : 'creator';

  if (!auth_code) {
    return NextResponse.redirect(
      getErrorRedirect(
        `${requestUrl.origin}/${type}/account`,
        'OAuth Error',
        "Sorry, we weren't able to validate the authentication code. Please try again!"
      )
    );
  }

  const authData = await generateAccessToken(auth_code);

  if (!authData) {
    return NextResponse.redirect(
      getErrorRedirect(
        `${requestUrl.origin}/${type}/account`,
        'OAuth Error',
        `Sorry, we weren't able to authorize your ${type} account. Please try again!`
      )
    );
  }

  return NextResponse.redirect(
    getStatusRedirect(
      `${requestUrl.origin}/${type}/account`,
      'Success!',
      `Your TikTok ${type} account has been successfully authorized.`
    )
  );
}
