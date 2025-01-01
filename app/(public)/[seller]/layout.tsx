import { SellerContextProvider } from '@/app/providers'
import { PropsWithChildren } from 'react'

interface SellerLayoutProps {
  params: Promise<{ seller: string }>
}

export default async function SellerLayout({
  params,
  children
}: PropsWithChildren<SellerLayoutProps>) {
  return (
    <SellerContextProvider seller={(await params).seller}>
      {children}
    </SellerContextProvider>
  )
}
