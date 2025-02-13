import Separator from '@/components/modules/Separator';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const socialLinks = [
  {
    icon: '/icons/tiktok-brands-solid.svg',
    link: 'https://www.tiktok.com'
  },
  {
    icon: '/icons/facebook-brands-solid.svg',
    link: 'https://www.facebook.com'
  },
  {
    icon: '/icons/x-twitter-brands-solid.svg',
    link: 'https://www.twitter.com'
  },
  {
    icon: '/icons/youtube-brands-solid.svg',
    link: 'https://www.youtube.com'
  }
];

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/' },
      { label: 'Pricing', href: '/' },
      { label: 'Case studies', href: '/' },
      { label: 'Reviews', href: '/' },
      { label: 'Updates', href: '/' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact us', href: '/contact' },
      { label: 'Careers', href: '/' },
      { label: 'Culture', href: '/' },
      { label: 'Blog', href: '/' }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Getting started', href: '/' },
      { label: 'Help center', href: '/' },
      { label: 'Server status', href: '/' },
      { label: 'Report a bug', href: '/' },
      { label: 'Chat support', href: '/' }
    ]
  },
  {
    title: 'Downloads',
    links: [
      { label: 'iOS', href: '/' },
      { label: 'Android', href: '/' },
      { label: 'Mac', href: '/' },
      { label: 'Windows', href: '/' },
      { label: 'Chrome', href: '/' }
    ]
  }
];

export default function Footer() {
  return (
    <footer>
      <div className="container max-w-7xl">
        <Separator className="opacity-60 my-8" />

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-4 gap-y-10">
          {footerLinks.map((column) => (
            <ul key={column.title} className="space-y-4">
              <li className="text-white text-sm font-semibold">
                {column.title}
              </li>

              {column.links.map((link) => (
                <li key={link.label} className="text-sm text-navy-300">
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          ))}

          <ul className="space-y-4">
            <li className="text-white text-sm font-semibold">Community</li>

            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.link}
                  href={link.link}
                  target="_blank"
                  className="no-underline"
                >
                  <Image
                    src={link.icon}
                    width={64}
                    height={64}
                    alt={link.link}
                    className="w-6 h-6 object-contain text-navy-300"
                  />
                </Link>
              ))}
            </div>
          </ul>
        </div>

        <Separator className="opacity-60 my-8" />

        <div className="text-center mb-4 space-y-1">
          <p className="text-xs">
            Copyright &copy; {new Date().getFullYear()} Flicker
          </p>

          <p className="text-xs">All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
