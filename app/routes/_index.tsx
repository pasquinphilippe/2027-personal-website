import {useLoaderData} from 'react-router';
import type {Route} from './+types/_index';
import {
  CtaSection,
  FeaturedWork,
  FeedbackFeature,
  HomeHero,
  LogoGrid,
  MerchantWinsTicker,
  WorkGrid,
} from '~/components/LeanSections';
import {buildStructuredData, getPublicConfig, siteConfig} from '~/lib/pasquin';

export const meta: Route.MetaFunction = ({data}) => {
  const siteUrl = data?.publicConfig.siteUrl || siteConfig.defaultSiteUrl;
  const title = 'Philippe Pasquin | Montreal Shopify Developer';
  const description =
    'Personal Shopify development for storefront systems, theme cleanup, app integrations, automation, performance, bank-of-hours work, and retainers.';

  return [
    {title},
    {name: 'description', content: description},
    {
      name: 'keywords',
      content:
        'Shopify developer Montreal, Shopify consultant Montreal, Shopify theme developer, Shopify storefront developer, Shopify app integrations, Shopify performance optimization, Shopify bank of hours, Shopify retainer',
    },
    {tagName: 'link', rel: 'canonical', href: siteUrl},
    {property: 'og:title', content: title},
    {property: 'og:description', content: description},
    {property: 'og:type', content: 'website'},
    {property: 'og:url', content: siteUrl},
    {property: 'og:image', content: `${siteUrl}/og-image.svg`},
    {property: 'og:locale', content: 'en_CA'},
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: title},
    {name: 'twitter:description', content: description},
    {name: 'twitter:image', content: `${siteUrl}/og-image.svg`},
  ];
};

export async function loader({context}: Route.LoaderArgs) {
  const publicConfig = getPublicConfig(context.env);

  return {
    publicConfig,
    structuredData: buildStructuredData({
      siteUrl: publicConfig.siteUrl,
      contactEmail: publicConfig.contactEmail,
    }),
  };
}

export default function Homepage() {
  const {structuredData} = useLoaderData<typeof loader>();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
      />
      <HomeHero />
      <FeaturedWork />
      <div className="gap-xxl" />
      <LogoGrid />
      <div className="gap-xxl" />
      <WorkGrid />
      <div className="gap-xxl" />
      <FeedbackFeature />
      <div className="gap-xxl" />
      <CtaSection />
      <MerchantWinsTicker />
      <div className="gap-xxl" />
    </>
  );
}
