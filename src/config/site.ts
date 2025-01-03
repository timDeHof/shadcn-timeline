const THEMES = ['default-yellow', 'default-black', 'default-white'] as const;
type Theme = typeof THEMES[number];

interface BuyMeACoffeeConfig {
  username: string;
  defaultTheme: Theme;
}

interface SiteLinks {
  github: string;
}

interface SiteConfig {
  name: string;
  description: string;
  url: string;
  buyMeACoffee: BuyMeACoffeeConfig;
  links: SiteLinks;
}

export const siteConfig: SiteConfig = {
  name: "Shadcn Timeline",
  description: "A timeline component built with shadcn/ui",
  url: process.env.SITE_URL || "https://localhost:3000",
  buyMeACoffee: {
    username: "timdehof",
    defaultTheme: "default-yellow",
  },
  links: {
    github: "https://github.com/TimDehof/shadcn-timeline",
  },
} as const;

export type { SiteConfig, Theme };
