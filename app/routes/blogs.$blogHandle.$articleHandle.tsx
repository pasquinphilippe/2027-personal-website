import {useLoaderData} from 'react-router';
import type {Route} from './+types/blogs.$blogHandle.$articleHandle';
import {Image} from '@shopify/hydrogen';
import {Breadcrumbs} from '~/components/Breadcrumbs';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {getPublicConfig, siteConfig} from '~/lib/pasquin';
import {
  getLanguageFromPathSearch,
  getLanguageFromRequest,
  getLocalizedUrl,
} from '~/lib/i18n';

export const meta: Route.MetaFunction = ({data, location}) => {
  const article = data?.article;
  const language =
    data?.language ?? getLanguageFromPathSearch(location.pathname, location.search);
  const siteUrl = data?.publicConfig.siteUrl || siteConfig.defaultSiteUrl;
  const blogHandle = data?.blogHandle ?? '';
  const articleHandle = data?.articleHandle ?? '';
  const path = `/blogs/${blogHandle}/${articleHandle}`;
  const canonical = getLocalizedUrl(siteUrl, path, language);
  const alternateEn = getLocalizedUrl(siteUrl, path, 'en');
  const alternateFr = getLocalizedUrl(siteUrl, path, 'fr');

  if (!article) {
    return [{title: `${siteConfig.logo} | Article`}];
  }

  const title = article.seo?.title || `${siteConfig.logo} | ${article.title}`;
  const description =
    article.seo?.description ||
    (article.excerpt ? article.excerpt : '').slice(0, 280) ||
    (language === 'fr'
      ? `${article.title} - article du blog de ${siteConfig.name}.`
      : `${article.title} - article from the ${siteConfig.name} blog.`);
  const imageUrl = article.image?.url || `${siteUrl}${siteConfig.ogImagePath}`;

  return [
    {title},
    {name: 'description', content: description},
    {tagName: 'link', rel: 'canonical', href: canonical},
    {tagName: 'link', rel: 'alternate', hrefLang: 'en-CA', href: alternateEn},
    {tagName: 'link', rel: 'alternate', hrefLang: 'fr-CA', href: alternateFr},
    {property: 'og:title', content: title},
    {property: 'og:description', content: description},
    {property: 'og:type', content: 'article'},
    {property: 'og:url', content: canonical},
    {property: 'og:image', content: imageUrl},
    {property: 'og:locale', content: language === 'fr' ? 'fr_CA' : 'en_CA'},
    {property: 'article:published_time', content: article.publishedAt},
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: title},
    {name: 'twitter:description', content: description},
    {name: 'twitter:image', content: imageUrl},
  ];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, request, params}: Route.LoaderArgs) {
  const {blogHandle, articleHandle} = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', {status: 404});
  }

  const [{blog}] = await Promise.all([
    context.storefront.query(ARTICLE_QUERY, {
      variables: {blogHandle, articleHandle},
      cache: context.storefront.CacheLong(),
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  redirectIfHandleIsLocalized(
    request,
    {
      handle: articleHandle,
      data: blog.articleByHandle,
    },
    {
      handle: blogHandle,
      data: blog,
    },
  );

  const article = blog.articleByHandle;
  const language = getLanguageFromRequest(request);
  const publicConfig = getPublicConfig(context.env);
  const path = `/blogs/${blogHandle}/${articleHandle}`;
  const canonical = getLocalizedUrl(publicConfig.siteUrl, path, language);
  const imageUrl = article.image?.url || `${publicConfig.siteUrl}${siteConfig.ogImagePath}`;
  const description =
    article.seo?.description ||
    (article.excerpt ? article.excerpt : '').slice(0, 280) ||
    article.title;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description,
    image: imageUrl,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author?.name || siteConfig.name,
      url: publicConfig.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${publicConfig.siteUrl}${siteConfig.logoImagePath}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    inLanguage: language === 'fr' ? 'fr-CA' : 'en-CA',
  };

  return {
    article,
    blogHandle,
    articleHandle,
    language,
    publicConfig,
    structuredData,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function Article() {
  const {article, structuredData, language, blogHandle, publicConfig} =
    useLoaderData<typeof loader>();
  const {title, image, contentHtml, author} = article;
  const breadcrumbItems = [
    {label: language === 'fr' ? 'Accueil' : 'Home', href: '/'},
    {
      label: language === 'fr' ? 'Blogue' : 'Blog',
      href: `/blogs/${blogHandle}`,
    },
    {label: title, href: `/blogs/${blogHandle}/${article.handle}`},
  ];

  const publishedDate = new Intl.DateTimeFormat(
    language === 'fr' ? 'fr-CA' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  ).format(new Date(article.publishedAt));

  return (
    <article className="article">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
      />
      <Breadcrumbs
        items={breadcrumbItems}
        language={language}
        siteUrl={publicConfig.siteUrl}
      />
      <h1>
        {title}
        <div>
          <time dateTime={article.publishedAt}>{publishedDate}</time> &middot;{' '}
          <address>{author?.name}</address>
        </div>
      </h1>

      {image && <Image data={image} sizes="90vw" loading="eager" />}
      <div
        dangerouslySetInnerHTML={{__html: contentHtml}}
        className="article"
      />
    </article>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog#field-blog-articlebyhandle
const ARTICLE_QUERY = `#graphql
  query Article(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      handle
      articleByHandle(handle: $articleHandle) {
        handle
        title
        contentHtml
        excerpt
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
` as const;
