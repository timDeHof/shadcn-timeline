import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.SITE_URL || 'https://localhost:3000'

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/private/', '/admin/'], // Add paths you want to block from crawling
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}