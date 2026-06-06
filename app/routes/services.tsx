import {Link, useLoaderData} from 'react-router';
import type {Route} from './+types/services';
import {
  CtaSection,
  MerchantWinsTicker,
  PageIntro,
} from '~/components/LeanSections';
import {
  getLanguageFromPathSearch,
  getLanguageFromRequest,
  getLocalizedHref,
  getLocalizedUrl,
} from '~/lib/i18n';
import {getPublicConfig, siteConfig} from '~/lib/pasquin';
import {getServicePageSummaries} from '~/lib/servicePages';

export const meta: Route.MetaFunction = ({data, location}) => {
  const language =
    data?.language ??
    getLanguageFromPathSearch(location.pathname, location.search);
  const siteUrl = data?.publicConfig.siteUrl || siteConfig.defaultSiteUrl;
  const canonical = getLocalizedUrl(siteUrl, '/services', language);
  const title =
    language === 'fr'
      ? 'Services Shopify | Philippe Pasquin'
      : 'Shopify Services | Philippe Pasquin';
  const description =
    language === 'fr'
      ? 'Vue d ensemble des services Shopify: systemes storefront, nettoyage de theme, operations, PDP, collections, panier, integrations, performance et automatisation.'
      : 'Overview of Shopify services: storefront systems, theme cleanup, operations, PDPs, collections, cart readiness, integrations, performance, and automation.';

  return [
    {title},
    {name: 'description', content: description},
    {tagName: 'link', rel: 'canonical', href: canonical},
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'en-CA',
      href: getLocalizedUrl(siteUrl, '/services', 'en'),
    },
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'fr-CA',
      href: getLocalizedUrl(siteUrl, '/services', 'fr'),
    },
    {property: 'og:title', content: title},
    {property: 'og:description', content: description},
    {property: 'og:type', content: 'website'},
    {property: 'og:url', content: canonical},
  ];
};

export function loader({context, request}: Route.LoaderArgs) {
  const language = getLanguageFromRequest(request);
  const publicConfig = getPublicConfig(context.env);
  const primaryServices = getServicePageSummaries(language, 'services');
  const shopifyWork = getServicePageSummaries(language, 'shopifyWork');
  const baseUrl = publicConfig.siteUrl.replace(/\/$/, '');

  return {
    language,
    publicConfig,
    primaryServices,
    shopifyWork,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${baseUrl}${language === 'fr' ? '/fr' : ''}/services#collection`,
      name:
        language === 'fr'
          ? 'Services Shopify Philippe Pasquin'
          : 'Philippe Pasquin Shopify services',
      url: `${baseUrl}${language === 'fr' ? '/fr' : ''}/services`,
      hasPart: [...primaryServices, ...shopifyWork].map((service) => ({
        '@type': 'Service',
        name: service.title,
        url: `${baseUrl}${language === 'fr' ? '/fr' : ''}${service.href}`,
        description: service.summary,
      })),
    },
  };
}

export default function ServicesOverviewPage() {
  const {language, primaryServices, shopifyWork, structuredData} =
    useLoaderData<typeof loader>();
  const labels =
    language === 'fr'
      ? {
          eyebrow: 'Services',
          title: 'Le travail Shopify, organise par probleme.',
          intro:
            'Une vue claire des endroits ou une boutique ralentit: storefront, theme, apps, panier, performance et operations.',
          primary: 'Services principaux',
          deeper: 'Travail Shopify specialise',
          explore: 'Ouvrir le service',
        }
      : {
          eyebrow: 'Services',
          title: 'Shopify work, organized by problem.',
          intro:
            'A clear map of where a store slows down: storefront, theme, apps, cart, performance, and operations.',
          primary: 'Primary services',
          deeper: 'Specialized Shopify work',
          explore: 'Open service',
        };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
      />
      <PageIntro title={labels.title} eyebrow={labels.eyebrow}>
        <p className="subtitle light">{labels.intro}</p>
      </PageIntro>

      <section className="container services-overview">
        <div className="services-overview-head">
          <div className="mini-heading">{labels.primary}</div>
        </div>
        <div className="services-overview-grid primary">
          {primaryServices.map((service, index) => (
            <Link
              className="services-overview-card"
              key={service.slug}
              to={getLocalizedHref(service.href, language)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h2>{service.navLabel}</h2>
              <p>{service.summary}</p>
              <strong>{labels.explore}</strong>
            </Link>
          ))}
        </div>
      </section>

      <div className="gap-xl" />

      <section className="container services-overview">
        <div className="services-overview-head">
          <div className="mini-heading">{labels.deeper}</div>
        </div>
        <div className="services-link-list">
          {shopifyWork.map((service, index) => (
            <Link
              className="services-line-link"
              key={service.slug}
              to={getLocalizedHref(service.href, language)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{service.navLabel}</strong>
              <p>{service.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="gap-xxl" />
      <CtaSection />
      <MerchantWinsTicker />
      <div className="gap-xxl" />
    </>
  );
}
