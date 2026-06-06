import {useLoaderData} from 'react-router';
import type {Route} from './+types/contact';
import {
  FeedbackGrid,
  MerchantWinsTicker,
  PageIntro,
} from '~/components/LeanSections';
import {PasquinBookingSelector} from '~/components/PasquinBookingSelector';
import {getPublicConfig, getSiteText, siteConfig} from '~/lib/pasquin';
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
      ? 'Contact | Philippe Pasquin Developpeur Shopify'
      : 'Contact | Philippe Pasquin Shopify Developer';
  const description =
    language === 'fr'
      ? "Contactez Philippe Pasquin pour developpement Shopify, banques d'heures, retainers, nettoyage de theme, integrations et performance."
      : 'Contact Philippe Pasquin for Shopify development, bank-of-hours work, retainers, theme cleanup, integrations, and performance support.';
  const canonical = getLocalizedUrl(siteUrl, '/contact', language);
  const alternateEn = getLocalizedUrl(siteUrl, '/contact', 'en');
  const alternateFr = getLocalizedUrl(siteUrl, '/contact', 'fr');
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

export default function ContactPage() {
  const {publicConfig} = useLoaderData<typeof loader>();
  const language = useSelectedLanguage();
  const text = getSiteText(language);

  return (
    <>
      <PageIntro title={text.pages.contactTitle} eyebrow={text.pages.contactEyebrow}>
        <p className="subtitle light">
          {text.pages.contactIntro}
        </p>
      </PageIntro>
      <FeedbackGrid />
      <div className="gap-xxl" />
      <PasquinBookingSelector publicConfig={publicConfig} />
      <div className="gap-xxl" />
      <section className="container medium email-line">
        <p>{text.pages.emailLead}</p>
        <a href={`mailto:${publicConfig.contactEmail}`}>{publicConfig.contactEmail}</a>
      </section>
      <div className="gap-xxl" />
      <MerchantWinsTicker />
      <div className="gap-xxl" />
    </>
  );
}
