import Footer from '@/components/sections/Footer'
import Navbar from '@/components/sections/Navbar'
import { PropsWithChildren } from 'react'

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />

      <main
        id="skip"
        className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
      >
        {children}
      </main>

      <Footer />
    </>
  )
}
