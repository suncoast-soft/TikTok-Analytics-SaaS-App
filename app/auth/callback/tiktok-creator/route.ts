import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getErrorRedirect, getStatusRedirect } from '@/utils/helpers';
import { generateCreatorAccessToken } from '@/utils/tiktok/creator-auth';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const auth_code = requestUrl.searchParams.get('code');

  if (!auth_code) {
    return NextResponse.redirect(
      getErrorRedirect(
        `${requestUrl.origin}/creator/account`,
        'OAuth Error',
        "Sorry, we weren't able to validate the authentication code. Please try again!"
      )
    );
  }

  const authData = await generateCreatorAccessToken(auth_code);

  if (!authData) {
    return NextResponse.redirect(
      getErrorRedirect(
        `${requestUrl.origin}/creator/account`,
        'OAuth Error',
        "Sorry, we weren't able to authorize your account. Please try again!"
      )
    );
  }

  return NextResponse.redirect(
    getStatusRedirect(
      `${requestUrl.origin}/creator/account`,
      'Success!',
      `Your TikTok account has been successfully authorized.`
    )
  );
}
