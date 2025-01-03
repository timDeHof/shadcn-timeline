import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
const ALLOWED_DOMAINS = ['buymeacoffee.com'];

interface BuyMeACoffeeProps {
  className?: string;
  width?: number;
  height?: number;
  username?: string;
  theme?: 'default-yellow' | 'default-black' | 'default-white';
}

const BuyMeACoffee = ({
  className,
  width = 217,
  height = 48,
  username = siteConfig.buyMeACoffee.username,
  theme = siteConfig.buyMeACoffee.defaultTheme
}: BuyMeACoffeeProps) => {
   // Sanitize username to prevent XSS
   const sanitizedUsername = username && encodeURIComponent(username.replace(/[^a-zA-Z0-9]/g, ''));
   const url = `https://buymeacoffee.com/${sanitizedUsername}`;

   // Verify domain for security
   const isValidDomain = ALLOWED_DOMAINS.some(domain => url.startsWith(`https://${domain}`));
   if (!isValidDomain) {
     console.error('Invalid domain detected');
     return null;
   }

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={cn('inline-block transition-transform rounded-lg hover:scale-105 hover:drop-shadow-lg', className)}
      aria-label={`Buy me a coffee on buymeacoffee.com/${sanitizedUsername}`}
    >
      <Image
        src={`https://cdn.buymeacoffee.com/buttons/v2/${theme}.png`}
        alt="Buy me a coffee"
        width={width}
        height={height}
        priority={false}
        loading="lazy"
        className="rounded-lg"
      />
    </Link>
  );
};

export default BuyMeACoffee;
