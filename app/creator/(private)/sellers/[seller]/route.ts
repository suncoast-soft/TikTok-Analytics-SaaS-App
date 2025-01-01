import { redirect } from 'next/navigation'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ seller: string }> }
) {
  const seller = (await params).seller
  redirect(`/creator/sellers/${seller}/analytics`)
}
