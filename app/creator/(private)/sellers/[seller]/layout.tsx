import { redirect } from 'next/navigation'

export default async function SellerPrivateLayout({
  params,
  children
}: {
  params: Promise<{ seller: string }>
  children: React.ReactNode
}) {
  const seller = (await params).seller
  if (!seller) {
    return redirect('/creator/sellers')
  }

  return children
}
