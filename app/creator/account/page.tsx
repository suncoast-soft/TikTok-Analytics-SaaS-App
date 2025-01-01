import EmailForm from '@/components/modules/AccountForms/EmailForm'
import UpdatePassword from '@/components/modules/AuthForms/UpdatePassword'
import { getRedirectMethod } from '@/utils/auth-helpers/settings'
import { getUser } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'

export default async function AuthTiktok() {
  const supabase = await createClient()
  const user = await getUser(supabase)
  const redirectMethod = getRedirectMethod()

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Manage Account Settings
      </h1>

      <div className="max-w-md mx-auto">
        <EmailForm userEmail={user.auth.email} />
      </div>

      <div className="max-w-md mx-auto">
        <UpdatePassword redirectMethod={redirectMethod} />
      </div>
    </div>
  )
}
