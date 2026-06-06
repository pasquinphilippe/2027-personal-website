import type {Route} from './+types/[feed.xml]';
import {getPublicConfig, siteConfig} from '~/lib/pasquin';

const FEED_QUERY = `#graphql
  query FeedBlogs(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    blogs(first: 5) {
      nodes {
        handle
        title
        articles(first: 20, sortKey: PUBLISHED_AT, reverse: true) {
          nodes {
            handle
            title
            excerpt
            contentHtml
            publishedAt
            author: authorV2 {
              name
            }
            image {
              url
              altText
            }
          }
        }
      }
    }
  }
` as const;

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function loader({context}: Route.LoaderArgs) {
  const publicConfig = getPublicConfig(context.env);
  const siteUrl = publicConfig.siteUrl.replace(/\/$/, '');

  const {blogs} = await context.storefront.query(FEED_QUERY, {
    cache: context.storefront.CacheLong(),
  });

  type Item = {
    title: string;
    link: string;
    description: string;
    pubDate: string;
    guid: string;
    author?: string;
  };

  const items: Item[] = [];

  for (const blog of blogs?.nodes ?? []) {
    for (const article of blog.articles?.nodes ?? []) {
      const link = `${siteUrl}/blogs/${blog.handle}/${article.handle}`;
      items.push({
        title: article.title,
        link,
        description: article.excerpt || article.contentHtml?.slice(0, 600) || '',
        pubDate: new Date(article.publishedAt).toUTCString(),
        guid: link,
        author: article.author?.name,
      });
    }
  }

  items.sort((a, b) => Date.parse(b.pubDate) - Date.parse(a.pubDate));

  const channelDescription = `Articles from ${siteConfig.name} - ${siteConfig.descriptor}.`;
  const lastBuildDate = items.length ? items[0].pubDate : new Date().toUTCString();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(channelDescription)}</description>
    <language>en-CA</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.guid}</guid>
      <pubDate>${item.pubDate}</pubDate>
      ${item.author ? `<author>${escapeXml(item.author)}</author>` : ''}
      <description>${escapeXml(item.description)}</description>
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': `max-age=${60 * 60}`,
    },
  });
}
