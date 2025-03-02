import Separator from '@/components/modules/Separator';
import { cn } from '@/utils/cn';
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
    title: 'Marketplace',
    links: [
      {
        label: 'Fashion and Beauty',
        href: '/?category=Fashion+and+Beauty'
      },
      {
        label: 'Fitness and Wellness',
        href: '/?category=Fitness+and+Wellness'
      },
      {
        label: 'Technology and Gadgets',
        href: '/?category=Technology+and+Gadgets'
      },
      {
        label: 'Lifestyle and Home',
        href: '/?category=Lifestyle+and+Home'
      }
    ]
  },
  {
    title: '',
    links: [
      {
        label: 'Food and Beverage',
        href: '/?category=Food+and+Beverage'
      },
      {
        label: 'Travel and Experiences',
        href: '/?category=Travel+and+Experiences'
      },
      {
        label: 'Others',
        href: '/?category=Others'
      }
    ]
  },
  {
    title: 'Creator',
    links: [
      { label: 'My Campaigns', href: '/creator/campaigns' },
      { label: 'My Earnings', href: '/creator/earning' },
      { label: 'My Top Videos', href: '/analytics/videos' },
      { label: 'Affiliate Orders', href: '/analytics/orders' }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'About', href: '/' },
      { label: 'Contact us', href: '/support' },
      { label: 'Terms and Conditions', href: '/terms and conditions' },
      { label: 'Privacy Policy', href: '/privacy-policy' }
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
              <li
                className={cn(
                  'text-white text-sm font-semibold',
                  column.title === '' && 'mb-8'
                )}
              >
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
                <Link key={link.link} href={link.link} target="_blank">
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
