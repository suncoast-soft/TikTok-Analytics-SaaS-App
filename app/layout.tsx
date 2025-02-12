import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { getURL } from '@/utils/helpers';
import { Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['100', '300', '400', '500', '600', '700', '800', '900']
});

const title = 'Flicker | TikTok Shop Analytics Tool';
const description = 'Join Affiliate Reward Campaigns for TikTok Shop Brands';

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`antialiased`}>
        {children}

        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
