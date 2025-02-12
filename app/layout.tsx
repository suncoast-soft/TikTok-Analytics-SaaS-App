import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getURL } from '@/utils/helpers';
import { Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
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
    <html lang="en" className={inter.variable}>
      <body className={`antialiased`}>
        {children}

        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
