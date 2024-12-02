import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  getAuthTypes,
  getViewTypes,
  getDefaultSignInView,
  getRedirectMethod
} from '@/utils/auth-helpers/settings'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import PasswordSignIn from '@/components/modules/AuthForms/PasswordSignIn'
import EmailSignIn from '@/components/modules/AuthForms/EmailSignIn'
import Separator from '@/components/modules/AuthForms/Separator'
import OauthSignIn from '@/components/modules/AuthForms/OauthSignIn'
import ForgotPassword from '@/components/modules/AuthForms/ForgotPassword'
import UpdatePassword from '@/components/modules/AuthForms/UpdatePassword'
import SignUp from '@/components/modules/AuthForms/Signup'
import { getUser } from '@/utils/supabase/queries'

export default async function AuthForms({
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
  const supabase = createClient()

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
                  <Separator text="or Sign in with" />
                  <OauthSignIn />
                </div>
              </CardFooter>
            )}
        </Card>
      </div>
    </div>
  )
}
