import type {Route} from './+types/[sitemap.xml]';
import {getPublicConfig} from '~/lib/pasquin';
import {getServicePageSummaries} from '~/lib/servicePages';

type SitemapEntry = {
  path: string;
  hreflang: 'en-CA' | 'fr-CA';
  priority: string;
  changefreq: string;
  alternatePath?: string;
};

const staticEntries: SitemapEntry[] = [
  {
    path: '/',
    hreflang: 'en-CA',
    alternatePath: '/fr',
    priority: '1.0',
    changefreq: 'weekly',
  },
  {
    path: '/fr',
    hreflang: 'fr-CA',
    alternatePath: '/',
    priority: '1.0',
    changefreq: 'weekly',
  },
  {
    path: '/services',
    hreflang: 'en-CA',
    alternatePath: '/fr/services',
    priority: '0.95',
    changefreq: 'weekly',
  },
  {
    path: '/fr/services',
    hreflang: 'fr-CA',
    alternatePath: '/services',
    priority: '0.95',
    changefreq: 'weekly',
  },
  {
    path: '/work',
    hreflang: 'en-CA',
    alternatePath: '/fr/work',
    priority: '0.9',
    changefreq: 'monthly',
  },
  {
    path: '/fr/work',
    hreflang: 'fr-CA',
    alternatePath: '/work',
    priority: '0.9',
    changefreq: 'monthly',
  },
  {
    path: '/pricing',
    hreflang: 'en-CA',
    alternatePath: '/fr/pricing',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    path: '/fr/pricing',
    hreflang: 'fr-CA',
    alternatePath: '/pricing',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    path: '/about',
    hreflang: 'en-CA',
    alternatePath: '/fr/about',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/fr/about',
    hreflang: 'fr-CA',
    alternatePath: '/about',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/testimonials',
    hreflang: 'en-CA',
    alternatePath: '/fr/testimonials',
    priority: '0.75',
    changefreq: 'monthly',
  },
  {
    path: '/fr/testimonials',
    hreflang: 'fr-CA',
    alternatePath: '/testimonials',
    priority: '0.75',
    changefreq: 'monthly',
  },
  {
    path: '/contact',
    hreflang: 'en-CA',
    alternatePath: '/fr/contact',
    priority: '0.9',
    changefreq: 'monthly',
  },
  {
    path: '/fr/contact',
    hreflang: 'fr-CA',
    alternatePath: '/contact',
    priority: '0.9',
    changefreq: 'monthly',
  },
  {
    path: '/get-started',
    hreflang: 'en-CA',
    alternatePath: '/fr/get-started',
    priority: '0.85',
    changefreq: 'monthly',
  },
  {
    path: '/fr/get-started',
    hreflang: 'fr-CA',
    alternatePath: '/get-started',
    priority: '0.85',
    changefreq: 'monthly',
  },
  {
    path: '/privacy-policy',
    hreflang: 'en-CA',
    alternatePath: '/fr/privacy-policy',
    priority: '0.2',
    changefreq: 'yearly',
  },
  {
    path: '/fr/privacy-policy',
    hreflang: 'fr-CA',
    alternatePath: '/privacy-policy',
    priority: '0.2',
    changefreq: 'yearly',
  },
  {
    path: '/cookie-notice',
    hreflang: 'en-CA',
    alternatePath: '/fr/cookie-notice',
    priority: '0.2',
    changefreq: 'yearly',
  },
  {
    path: '/fr/cookie-notice',
    hreflang: 'fr-CA',
    alternatePath: '/cookie-notice',
    priority: '0.2',
    changefreq: 'yearly',
  },
  {
    path: '/terms-of-use',
    hreflang: 'en-CA',
    alternatePath: '/fr/terms-of-use',
    priority: '0.2',
    changefreq: 'yearly',
  },
  {
    path: '/fr/terms-of-use',
    hreflang: 'fr-CA',
    alternatePath: '/terms-of-use',
    priority: '0.2',
    changefreq: 'yearly',
  },
];

export function loader({context}: Route.LoaderArgs) {
  const publicConfig = getPublicConfig(context.env);
  const baseUrl = publicConfig.siteUrl.replace(/\/$/, '');
  const lastmod = new Date().toISOString().slice(0, 10);
  const serviceEntries = getServicePageSummaries('en').flatMap((service) => [
    {
      path: service.href,
      hreflang: 'en-CA' as const,
      alternatePath: `/fr${service.href}`,
      priority: '0.85',
      changefreq: 'monthly',
    },
    {
      path: `/fr${service.href}`,
      hreflang: 'fr-CA' as const,
      alternatePath: service.href,
      priority: '0.85',
      changefreq: 'monthly',
    },
  ]);
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
    `    <xhtml:link rel="alternate" hreflang="${entry.hreflang}" href="${escapeXml(loc)}" />`,
    alternate
      ? `    <xhtml:link rel="alternate" hreflang="${alternateLanguage(entry.hreflang)}" href="${escapeXml(alternate)}" />`
      : '',
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${entry.changefreq}</changefreq>`,
    `    <priority>${entry.priority}</priority>`,
    '  </url>',
  ]
    .filter(Boolean)
    .join('\n');
}

function alternateLanguage(language: SitemapEntry['hreflang']) {
  return language === 'fr-CA' ? 'en-CA' : 'fr-CA';
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
