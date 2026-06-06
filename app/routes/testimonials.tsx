import type {Route} from './+types/testimonials';
import {useLoaderData} from 'react-router';
import {
  CtaSection,
  FeedbackGrid,
  MerchantWinsTicker,
  PageIntro,
} from '~/components/LeanSections';
import {
  getPartnerReviews,
  getPartnerReviewSummary,
  getPublicConfig,
  getSiteText,
  siteConfig,
} from '~/lib/pasquin';
import {
  getLanguageFromPathSearch,
  getLanguageFromRequest,
  getLocalizedUrl,
  useSelectedLanguage,
} from '~/lib/i18n';

export const meta: Route.MetaFunction = ({data, location}) => {
  const language =
    data?.language ?? getLanguageFromPathSearch(location.pathname, location.search);
  const siteUrl = data?.publicConfig.siteUrl || siteConfig.defaultSiteUrl;
  const canonical = getLocalizedUrl(siteUrl, '/testimonials', language);
  const alternateEn = getLocalizedUrl(siteUrl, '/testimonials', 'en');
  const alternateFr = getLocalizedUrl(siteUrl, '/testimonials', 'fr');
  const title =
    language === 'fr'
      ? 'Temoignages | Philippe Pasquin Developpeur Shopify'
      : 'Testimonials | Philippe Pasquin Shopify Developer';
  const description =
    language === 'fr'
      ? 'Besoins marchands recurrents et signaux terrain pour developpement Shopify, nettoyage de theme, integrations, automatisation et support mensuel.'
      : 'Common merchant needs and working signals for Shopify development, theme cleanup, app integrations, automation, and monthly support.';

  return [
    {title},
    {name: 'description', content: description},
    {tagName: 'link', rel: 'canonical', href: canonical},
    {tagName: 'link', rel: 'alternate', hrefLang: 'en-CA', href: alternateEn},
    {tagName: 'link', rel: 'alternate', hrefLang: 'fr-CA', href: alternateFr},
    {property: 'og:title', content: title},
    {property: 'og:description', content: description},
    {property: 'og:type', content: 'website'},
    {property: 'og:url', content: canonical},
    {property: 'og:locale', content: language === 'fr' ? 'fr_CA' : 'en_CA'},
    {name: 'twitter:card', content: 'summary'},
    {name: 'twitter:title', content: title},
    {name: 'twitter:description', content: description},
  ];
};

export async function loader({request, context}: Route.LoaderArgs) {
  const language = getLanguageFromRequest(request);
  const publicConfig = getPublicConfig(context.env);
  const reviews = getPartnerReviews();
  const reviewSummary = getPartnerReviewSummary();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${publicConfig.siteUrl.replace(/\/$/, '')}/#business`,
    name:
      language === 'fr'
        ? 'Philippe Pasquin developpement Shopify'
        : 'Philippe Pasquin Shopify development',
    url: `${publicConfig.siteUrl.replace(/\/$/, '')}${language === 'fr' ? '/fr' : ''}/testimonials`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviewSummary.rating,
      reviewCount: reviewSummary.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Organization',
        name: review.author,
      },
      datePublished: review.datePublished,
      reviewBody: review.quote,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 5,
        bestRating: 5,
        worstRating: 1,
      },
      itemReviewed: {
        '@type': 'Service',
        name: review.service,
      },
    })),
  };

  return {language, publicConfig, structuredData};
}

export default function TestimonialsPage() {
  const {structuredData} = useLoaderData<typeof loader>();
  const language = useSelectedLanguage();
  const text = getSiteText(language);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
      />
      <PageIntro
        title={text.pages.testimonialsTitle}
        eyebrow={text.pages.testimonialsEyebrow}
      >
        <p className="subtitle light">
          {text.pages.testimonialsIntro}
        </p>
      </PageIntro>
      <FeedbackGrid />
      <div className="gap-xxl" />
      <CtaSection />
      <MerchantWinsTicker />
      <div className="gap-xxl" />
    </>
  );
}
