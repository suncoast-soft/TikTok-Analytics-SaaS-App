import { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import { PropsWithChildren, Suspense } from 'react'
import { getURL } from '@/utils/helpers'
import 'styles/main.css'

const title = 'Flicker | TikTok Shop Analytics Tool'
const description = 'Join Affiliate Reward Campaigns for TikTok Shop Brands'

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description
  }
}

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        {children}

        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  )
}
