import type {Route} from './+types/pricing';
import {useLoaderData} from 'react-router';
import {PricingProducts} from '~/components/PricingProducts';
import {
  CtaSection,
  FeedbackFeature,
  MerchantWinsTicker,
  PageIntro,
  TimeframeTable,
} from '~/components/LeanSections';
import {getPublicConfig, getSiteText, siteConfig} from '~/lib/pasquin';
import {
  getLanguageFromPathSearch,
  getLanguageFromRequest,
  getLocalizedUrl,
} from '~/lib/i18n';
import {
  getPricingProducts,
  normalizePricingCurrency,
} from '~/lib/pricingProducts';

export const meta: Route.MetaFunction = ({data, location}) => {
  const language =
    data?.language ?? getLanguageFromPathSearch(location.pathname, location.search);
  const siteUrl = data?.publicConfig?.siteUrl || siteConfig.defaultSiteUrl;
  const title =
    language === 'fr'
      ? 'Tarifs | Philippe Pasquin Developpeur Shopify'
      : 'Pricing | Philippe Pasquin Shopify Developer';
  const description =
    language === 'fr'
      ? "Tarifs de developpement Shopify pour banques d'heures et retainers mensuels, incluant options 5 h, 40 h et support mensuel."
      : 'Shopify development pricing for bank-of-hours work and monthly retainers, including 5-hour, scoped, 40-hour, and monthly support options.';
  const canonical = getLocalizedUrl(siteUrl, '/pricing', language);
  const alternateEn = getLocalizedUrl(siteUrl, '/pricing', 'en');
  const alternateFr = getLocalizedUrl(siteUrl, '/pricing', 'fr');
  const ogImage = `${siteUrl.replace(/\/$/, '')}${siteConfig.ogImagePath}`;

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
    {property: 'og:image', content: ogImage},
    {property: 'og:locale', content: language === 'fr' ? 'fr_CA' : 'en_CA'},
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: title},
    {name: 'twitter:description', content: description},
    {name: 'twitter:image', content: ogImage},
  ];
};

export async function loader({context, request}: Route.LoaderArgs) {
  const url = new URL(request.url);
  const language = getLanguageFromRequest(request);
  const currency = normalizePricingCurrency(url.searchParams.get('currency'));
  const pricing = await getPricingProducts({
    currency,
    language,
    storefront: context.storefront,
  });

  return {
    currency,
    language,
    pricing,
    publicConfig: getPublicConfig(context.env),
  };
}

export default function PricingPage() {
  const {language, pricing} = useLoaderData<typeof loader>();
  const text = getSiteText(language);

  return (
    <>
      <PageIntro
        title={text.pages.pricingTitle}
        eyebrow={text.pages.pricingEyebrow}
      >
        <p className="subtitle light">{text.pages.pricingIntro}</p>
      </PageIntro>
      <PricingProducts pricing={pricing} />
      <div className="gap-xxl" />
      <TimeframeTable />
      <div className="gap-xxl" />
      <FeedbackFeature />
      <div className="gap-xxl" />
      <CtaSection />
      <MerchantWinsTicker />
      <div className="gap-xxl" />
    </>
  );
}
