import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getErrorRedirect, getStatusRedirect } from '@/utils/helpers';
import { generateSellerAccessToken } from '@/utils/tiktok/seller-auth';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const auth_code = requestUrl.searchParams.get('code');

  if (!auth_code) {
    return NextResponse.redirect(
      getErrorRedirect(
        `${requestUrl.origin}/seller/account`,
        'OAuth Error',
        "Sorry, we weren't able to validate the authentication code. Please try again!"
      )
    );
  }

  const authData = await generateSellerAccessToken(auth_code);

  if (!authData) {
    return NextResponse.redirect(
      getErrorRedirect(
        `${requestUrl.origin}/seller/account`,
        'OAuth Error',
        "Sorry, we weren't able to authorize your seller account. Please try again!"
      )
    );
  }

  return NextResponse.redirect(
    getStatusRedirect(
      `${requestUrl.origin}/seller/account`,
      'Success!',
      `Your TikTok seller account has been successfully authorized.`
    )
  );
}
