import React from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import BuyMeACoffee from '@/components/buy-me-a-coffee';
import { siteConfig } from '@/config/site';

export function Sidebar() {
  return (
    <aside className="flex-shrink-0 md:w-64">
      <div className="sticky top-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Link href="#" className="text-2xl font-bold">
              shadcn-timeline
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                href={siteConfig.links.github}
                className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
              >
                <Github className="size-5" />
              </Link>
            </div>
          </div>
          <nav className="flex flex-col space-y-2">
            <Link href="#installation" className="text-muted-foreground hover:text-foreground">
              Installation
            </Link>
            <Link href="#usage" className="text-muted-foreground hover:text-foreground">
              Usage
            </Link>
            <Link href="#examples" className="text-muted-foreground hover:text-foreground">
              Examples
            </Link>
          </nav>
          <BuyMeACoffee />
        </div>
      </div>
    </aside>
  );
}