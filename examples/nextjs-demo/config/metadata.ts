import type { Metadata, Viewport } from 'next';
import { siteConfig } from './site';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
} as const;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
} as const;