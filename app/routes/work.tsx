import type {Route} from './+types/work';
import {
  CtaSection,
  MerchantWinsTicker,
  PageIntro,
  WorkGrid,
} from '~/components/LeanSections';
import {getPublicConfig, getSiteText, getWorkItems, siteConfig} from '~/lib/pasquin';
import {
  getLanguageFromPathSearch,
  getLanguageFromRequest,
  getLocalizedUrl,
  useSelectedLanguage,
} from '~/lib/i18n';

export const meta: Route.MetaFunction = ({data, location}) => {
  const language =
    data?.language ?? getLanguageFromPathSearch(location.pathname, location.search);
  const siteUrl = data?.publicConfig?.siteUrl || siteConfig.defaultSiteUrl;
  const title =
    language === 'fr'
      ? 'Projets clients | Philippe Pasquin Developpeur Shopify'
      : 'Client Work | Philippe Pasquin Shopify Developer';
  const description =
    language === 'fr'
      ? 'Projets clients selectionnes en developpement Shopify, B2B, POS, ERP, SEO, automatisation et support technique continu.'
      : 'Selected client projects across Shopify theme development, B2B features, POS apps, ERP integrations, SEO, automation, and ongoing technical support.';
  const canonical = getLocalizedUrl(siteUrl, '/work', language);
  const alternateEn = getLocalizedUrl(siteUrl, '/work', 'en');
  const alternateFr = getLocalizedUrl(siteUrl, '/work', 'fr');
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
  return {
    language: getLanguageFromRequest(request),
    publicConfig: getPublicConfig(context.env),
  };
}

export default function WorkPage() {
  const language = useSelectedLanguage();
  const text = getSiteText(language);
  const workItems = getWorkItems(language);
  const tags =
    language === 'fr'
      ? ['Tous', 'theme', 'b2b', 'apps', 'pos', 'seo', 'support']
      : ['All', 'theme', 'b2b', 'apps', 'pos', 'seo', 'support'];
  const allTag = language === 'fr' ? 'Tous' : 'All';

  return (
    <>
      <PageIntro title={text.pages.workTitle} eyebrow={text.pages.workEyebrow}>
        <div className="filter-row" aria-label="Work filters">
          {tags.map((tag) => (
            <span className="pill" key={tag}>
              {tag} {tag === allTag ? workItems.length : ''}
            </span>
          ))}
        </div>
      </PageIntro>
      <WorkGrid />
      <div className="gap-xxl" />
      <CtaSection />
      <MerchantWinsTicker />
      <div className="gap-xxl" />
    </>
  );
}
