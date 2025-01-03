import { redirect } from 'next/navigation'
import { getDefaultSignInView } from '@/utils/auth-helpers/settings'
import { cookies } from 'next/headers'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function SignIn({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const preferredSignInView =
    (await cookies()).get('preferredSignInView')?.value || null
  const defaultView = getDefaultSignInView(preferredSignInView)

  return redirect(
    `/creator/admin/auth/${defaultView}?seller=${(await searchParams).seller}`
  )
}
