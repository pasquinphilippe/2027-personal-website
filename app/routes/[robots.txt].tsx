import type {Route} from './+types/[robots.txt]';

export function loader({request}: Route.LoaderArgs) {
  const url = new URL(request.url);
  const body = robotsTxtData({url: url.origin});

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',

      'Cache-Control': `max-age=${60 * 60 * 24}`,
    },
  });
}

function robotsTxtData({url}: {url?: string}) {
  const sitemapUrl = url ? `${url}/sitemap.xml` : undefined;
  const servicesSitemapUrl = url ? `${url}/services-sitemap.xml` : undefined;

  return `
User-agent: *
${generalDisallowRules({sitemapUrl, servicesSitemapUrl})}

# Google adsbot ignores robots.txt unless specifically named!
User-agent: adsbot-google
Disallow: /cart
Disallow: /account
Disallow: /search
Allow: /search/
Disallow: /search/?*

User-agent: Nutch
Disallow: /

User-agent: AhrefsBot
Crawl-delay: 10
${generalDisallowRules({sitemapUrl, servicesSitemapUrl})}

User-agent: AhrefsSiteAudit
Crawl-delay: 10
${generalDisallowRules({sitemapUrl, servicesSitemapUrl})}

User-agent: MJ12bot
Crawl-Delay: 10

User-agent: Pinterest
Crawl-delay: 1

# AI / answer-engine crawlers — allow indexing of content
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Bytespider
Disallow: /
`.trim();
}

/**
 * This function generates disallow rules that generally follow what Shopify's
 * Online Store has as defaults for their robots.txt
 */
function generalDisallowRules({
  sitemapUrl,
  servicesSitemapUrl,
}: {
  sitemapUrl?: string;
  servicesSitemapUrl?: string;
}) {
  return `Disallow: /cart
Disallow: /account
Allow: /llms.txt
Allow: /services-sitemap.xml
Allow: /feed.xml
Disallow: /collections/*sort_by*
Disallow: /*/collections/*sort_by*
Disallow: /collections/*+*
Disallow: /collections/*%2B*
Disallow: /collections/*%2b*
Disallow: /*/collections/*+*
Disallow: /*/collections/*%2B*
Disallow: /*/collections/*%2b*
Disallow: /*/collections/*filter*&*filter*
Disallow: /blogs/*+*
Disallow: /blogs/*%2B*
Disallow: /blogs/*%2b*
Disallow: /*/blogs/*+*
Disallow: /*/blogs/*%2B*
Disallow: /*/blogs/*%2b*
Disallow: /policies/
Disallow: /search
Allow: /search/
Disallow: /search/?*
${sitemapUrl ? `Sitemap: ${sitemapUrl}` : ''}
${servicesSitemapUrl ? `Sitemap: ${servicesSitemapUrl}` : ''}`;
}
