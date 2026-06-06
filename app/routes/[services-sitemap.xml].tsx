import type {Route} from './+types/[services-sitemap.xml]';
import {getServicePageSummaries} from '~/lib/servicePages';

export function loader({request}: Route.LoaderArgs) {
  const url = new URL(request.url);
  const origin = url.origin.replace(/\/$/, '');
  const lastmod = new Date().toISOString().slice(0, 10);
  const pages = [
    ...getServicePageSummaries('en').map((service) => ({
      loc: `${origin}${service.href}`,
      lastmod,
      priority: service.group === 'services' ? '0.85' : '0.8',
    })),
    ...getServicePageSummaries('fr').map((service) => ({
      loc: `${origin}/fr${service.href}`,
      lastmod,
      priority: service.group === 'services' ? '0.85' : '0.8',
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${escapeXml(page.loc)}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': `max-age=${60 * 60 * 24}`,
    },
  });
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
