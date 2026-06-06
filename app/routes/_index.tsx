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
import {buildStructuredData, getPublicConfig, getSiteText, siteConfig} from '~/lib/pasquin';
import {
  getLanguageFromPathSearch,
  getLanguageFromRequest,
  getLocalizedUrl,
} from '~/lib/i18n';

export const meta: Route.MetaFunction = ({data, location}) => {
  const language =
    data?.language ?? getLanguageFromPathSearch(location.pathname, location.search);
  const text = getSiteText(language);
  const siteUrl = data?.publicConfig.siteUrl || siteConfig.defaultSiteUrl;
  const title = text.pages.homeTitle;
  const description = text.pages.homeDescription;
  const canonical = getLocalizedUrl(siteUrl, '/', language);

  return [
    {title},
    {name: 'description', content: description},
    {
      name: 'keywords',
      content: text.pages.homeKeywords,
    },
    {tagName: 'link', rel: 'canonical', href: canonical},
    {tagName: 'link', rel: 'alternate', hrefLang: 'en-CA', href: siteUrl},
    {tagName: 'link', rel: 'alternate', hrefLang: 'fr-CA', href: `${siteUrl}/fr`},
    {property: 'og:title', content: title},
    {property: 'og:description', content: description},
    {property: 'og:type', content: 'website'},
    {property: 'og:url', content: canonical},
    {property: 'og:image', content: `${siteUrl}/og-image.svg`},
    {property: 'og:locale', content: language === 'fr' ? 'fr_CA' : 'en_CA'},
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: title},
    {name: 'twitter:description', content: description},
    {name: 'twitter:image', content: `${siteUrl}/og-image.svg`},
  ];
};

export async function loader({context, request}: Route.LoaderArgs) {
  const publicConfig = getPublicConfig(context.env);
  const language = getLanguageFromRequest(request);

  return {
    language,
    publicConfig,
    structuredData: buildStructuredData({
      siteUrl: publicConfig.siteUrl,
      contactEmail: publicConfig.contactEmail,
      language,
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
      <WorkGrid variant="index" />
      <div className="gap-xxl" />
      <FeedbackFeature />
      <div className="gap-xxl" />
      <CtaSection />
      <MerchantWinsTicker />
      <div className="gap-xxl" />
    </>
  );
}
