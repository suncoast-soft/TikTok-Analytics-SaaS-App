import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  getAuthTypes,
  getViewTypes,
  getDefaultSignInView,
  getRedirectMethod
} from '@/utils/auth-helpers/settings'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import PasswordSignIn from '@/components/modules/Forms/PasswordSignIn'
import EmailSignIn from '@/components/modules/Forms/EmailSignIn'
import OauthSignIn from '@/components/modules/Forms/OauthSignIn'
import ForgotPassword from '@/components/modules/Forms/ForgotPassword'
import UpdatePassword from '@/components/modules/Forms/UpdatePassword'
import SignUp from '@/components/modules/Forms/Signup'
import { getUser } from '@/utils/supabase/queries'
import TextSeparator from '@/components/modules/TextSeparator'

export default async function Auth({
  params,
  type
}: {
  params: { id: string }
  type: string
}) {
  const { allowOauth, allowEmail, allowPassword } = getAuthTypes()
  const viewTypes = getViewTypes()
  const redirectMethod = getRedirectMethod()

  // Declare 'viewProp' and initialize with the default value
  let viewProp: string

  // Assign url id to 'viewProp' if it's a valid string and ViewTypes includes it
  if (typeof params.id === 'string' && viewTypes.includes(params.id)) {
    viewProp = params.id
  } else {
    const preferredSignInView =
      (await cookies()).get('preferredSignInView')?.value || null
    viewProp = getDefaultSignInView(preferredSignInView)
    return redirect(`/${type}/${viewProp}`)
  }

  // Check if the user is already logged in and redirect to the account page if so
  const supabase = await createClient()

  const user = await getUser(supabase)

  if (user && viewProp !== 'update_password') {
    return redirect(`/${type}/account`)
  } else if (!user && viewProp === 'update_password') {
    return redirect(`/${type}/update_password`)
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-96">
        <Card className="z-10 text-left">
          <CardContent className="pt-4">
            {viewProp === 'password_signin' && (
              <PasswordSignIn
                allowEmail={allowEmail}
                redirectMethod={redirectMethod}
                type={type}
              />
            )}
            {viewProp === 'email_signin' && (
              <EmailSignIn
                allowPassword={allowPassword}
                redirectMethod={redirectMethod}
                type={type}
              />
            )}
            {viewProp === 'forgot_password' && (
              <ForgotPassword
                allowEmail={allowEmail}
                redirectMethod={redirectMethod}
                type={type}
              />
            )}
            {viewProp === 'update_password' && (
              <UpdatePassword redirectMethod={redirectMethod} />
            )}
            {viewProp === 'signup' && (
              <SignUp
                allowEmail={allowEmail}
                redirectMethod={redirectMethod}
                type={type}
              />
            )}
          </CardContent>

          {viewProp !== 'update_password' &&
            viewProp !== 'signup' &&
            allowOauth && (
              <CardFooter>
                <div className="w-full">
                  <TextSeparator text="or Sign in with" />
                  <OauthSignIn />
                </div>
              </CardFooter>
            )}
        </Card>
      </div>
    </div>
  )
}
