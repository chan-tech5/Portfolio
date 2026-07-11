import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chandru-portfolio.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/workspace', '/api/', '/login'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
