import type {Route} from './+types/[sitemap.xml]';
import {getPublicConfig} from '~/lib/pasquin';
import {getServicePageSummaries} from '~/lib/servicePages';

type SitemapEntry = {
  path: string;
  priority: string;
  changefreq: string;
  alternatePath?: string;
};

const staticEntries: SitemapEntry[] = [
  {path: '/', alternatePath: '/fr', priority: '1.0', changefreq: 'weekly'},
  {
    path: '/services',
    alternatePath: '/fr/services',
    priority: '0.95',
    changefreq: 'weekly',
  },
  {path: '/work', alternatePath: '/fr/work', priority: '0.9', changefreq: 'monthly'},
  {
    path: '/pricing',
    alternatePath: '/fr/pricing',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {path: '/about', alternatePath: '/fr/about', priority: '0.7', changefreq: 'monthly'},
  {
    path: '/testimonials',
    alternatePath: '/fr/testimonials',
    priority: '0.75',
    changefreq: 'monthly',
  },
  {
    path: '/contact',
    alternatePath: '/fr/contact',
    priority: '0.9',
    changefreq: 'monthly',
  },
  {
    path: '/get-started',
    alternatePath: '/fr/get-started',
    priority: '0.85',
    changefreq: 'monthly',
  },
  {
    path: '/privacy-policy',
    alternatePath: '/fr/privacy-policy',
    priority: '0.2',
    changefreq: 'yearly',
  },
  {
    path: '/cookie-notice',
    alternatePath: '/fr/cookie-notice',
    priority: '0.2',
    changefreq: 'yearly',
  },
  {
    path: '/terms-of-use',
    alternatePath: '/fr/terms-of-use',
    priority: '0.2',
    changefreq: 'yearly',
  },
];

export function loader({context}: Route.LoaderArgs) {
  const publicConfig = getPublicConfig(context.env);
  const baseUrl = publicConfig.siteUrl.replace(/\/$/, '');
  const lastmod = new Date().toISOString().slice(0, 10);
  const serviceEntries = getServicePageSummaries('en').map((service) => ({
    path: service.href,
    alternatePath: `/fr${service.href}`,
    priority: '0.85',
    changefreq: 'monthly',
  }));
  const entries = [...staticEntries, ...serviceEntries];
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries.map((entry) => buildUrlEntry({baseUrl, entry, lastmod})),
    '</urlset>',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': `max-age=${60 * 60 * 24}`,
    },
  });
}

function buildUrlEntry({
  baseUrl,
  entry,
  lastmod,
}: {
  baseUrl: string;
  entry: SitemapEntry;
  lastmod: string;
}) {
  const loc = buildAbsoluteUrl(baseUrl, entry.path);
  const alternate = entry.alternatePath
    ? buildAbsoluteUrl(baseUrl, entry.alternatePath)
    : null;

  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    alternate
      ? `    <xhtml:link rel="alternate" hreflang="en-CA" href="${escapeXml(loc)}" />`
      : '',
    alternate
      ? `    <xhtml:link rel="alternate" hreflang="fr-CA" href="${escapeXml(alternate)}" />`
      : '',
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${entry.changefreq}</changefreq>`,
    `    <priority>${entry.priority}</priority>`,
    '  </url>',
  ]
    .filter(Boolean)
    .join('\n');
}

function buildAbsoluteUrl(baseUrl: string, path: string) {
  if (path === '/') {
    return `${baseUrl}/`;
  }

  return `${baseUrl}${path}`;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
