import { redirect } from 'next/navigation'

export default async function Admin() {
  return redirect(`/creator/admin/auth`)
}
