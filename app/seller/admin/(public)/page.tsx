import { redirect } from 'next/navigation'

export default async function Admin() {
  return redirect(`/seller/admin/auth`)
}
