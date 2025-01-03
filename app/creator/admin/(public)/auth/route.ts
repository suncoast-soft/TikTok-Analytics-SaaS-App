import { redirect } from 'next/navigation'
import { getDefaultSignInView } from '@/utils/auth-helpers/settings'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const seller = requestUrl.searchParams.get('seller')

  const cookieStore = await cookies()

  const preferredSignInView =
    cookieStore.get('preferredSignInView')?.value || null
  const defaultView = getDefaultSignInView(preferredSignInView)

  if (seller) {
    cookieStore.set('seller', seller)
  }

  redirect(`/creator/admin/auth/${defaultView}`)
}
