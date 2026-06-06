import {Link, useLoaderData} from 'react-router';
import type {Route} from './+types/services.$handle';
import {CtaSection, MerchantWinsTicker} from '~/components/LeanSections';
import {getLanguageFromRequest, getLocalizedHref, getLocalizedUrl} from '~/lib/i18n';
import {getPublicConfig, siteConfig} from '~/lib/pasquin';
import {
  buildServiceStructuredData,
  getRelatedServicePages,
  getServicePageByHandle,
  getServiceReferences,
} from '~/lib/servicePages';

export const meta: Route.MetaFunction = ({data, location}) => {
  const language = data?.language ?? (location.pathname.startsWith('/fr') ? 'fr' : 'en');
  const service = data?.service;
  const siteUrl = data?.publicConfig.siteUrl || siteConfig.defaultSiteUrl;

  if (!service) {
    return [
      {
        title:
          language === 'fr'
            ? 'Service introuvable | Philippe Pasquin'
            : 'Service not found | Philippe Pasquin',
      },
    ];
  }

  const canonical = getLocalizedUrl(siteUrl, `/services/${service.slug}`, language);
  const alternateEn = getLocalizedUrl(siteUrl, `/services/${service.slug}`, 'en');
  const alternateFr = getLocalizedUrl(siteUrl, `/services/${service.slug}`, 'fr');

  return [
    {title: service.metaTitle},
    {name: 'description', content: service.metaDescription},
    {name: 'keywords', content: service.keywords.join(', ')},
    {tagName: 'link', rel: 'canonical', href: canonical},
    {tagName: 'link', rel: 'alternate', hrefLang: 'en-CA', href: alternateEn},
    {tagName: 'link', rel: 'alternate', hrefLang: 'fr-CA', href: alternateFr},
    {property: 'og:title', content: service.metaTitle},
    {property: 'og:description', content: service.metaDescription},
    {property: 'og:type', content: 'website'},
    {property: 'og:url', content: canonical},
    {property: 'og:locale', content: language === 'fr' ? 'fr_CA' : 'en_CA'},
    {name: 'twitter:card', content: 'summary'},
    {name: 'twitter:title', content: service.metaTitle},
    {name: 'twitter:description', content: service.metaDescription},
  ];
};

export async function loader({params, request, context}: Route.LoaderArgs) {
  const language = getLanguageFromRequest(request);
  const service = getServicePageByHandle(params.handle, language);

  if (!service) {
    throw new Response('Service not found', {status: 404});
  }

  const publicConfig = getPublicConfig(context.env);
  const references = getServiceReferences(service, language);
  const relatedServices = getRelatedServicePages(service, language);

  return {
    language,
    publicConfig,
    service,
    references,
    relatedServices,
    structuredData: buildServiceStructuredData({
      service,
      siteUrl: publicConfig.siteUrl,
      language,
    }),
  };
}

export default function ServicePage() {
  const {language, service, references, relatedServices, structuredData} =
    useLoaderData<typeof loader>();
  const pricingHref = getLocalizedHref('/pricing', language);
  const contactHref = getLocalizedHref('/contact', language);
  const workHref = getLocalizedHref('/work', language);
  const labels =
    language === 'fr'
      ? {
          overview: 'Vue rapide',
          problem: 'Probleme',
          solution: 'Solution',
          deliverables: 'Livrables',
          outcomes: 'Resultats',
          references: 'References',
          process: 'Processus',
          faq: 'FAQ',
          related: 'Services lies',
        }
      : {
          overview: 'Quick view',
          problem: 'Problem',
          solution: 'Solution',
          deliverables: 'Deliverables',
          outcomes: 'Outcomes',
          references: 'References',
          process: 'Process',
          faq: 'FAQ',
          related: 'Related services',
        };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
      />
      <article className="service-page">
        <section className="container service-hero">
          <div className="service-hero-copy">
            <div className="hero-proof-callout">{service.eyebrow}</div>
            <div className="gap-l" />
            <h1>{service.title}</h1>
            <p className="subtitle light">{service.summary}</p>
            <div className="pill-row service-keyword-row" aria-label={labels.overview}>
              {service.heroPoints.map((point) => (
                <span className="pill" key={point}>
                  {point}
                </span>
              ))}
            </div>
            <div className="btn-grp">
              <Link className="btn big" to={contactHref}>
                {service.ctaPrimary}
              </Link>
              <Link className="btn secondary big" to={pricingHref}>
                {service.ctaSecondary}
              </Link>
            </div>
          </div>
          <aside className="service-fit-panel">
            <div className="mini-heading">{service.fitHeading}</div>
            <div className="service-fit-list">
              {service.fit.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </aside>
        </section>

        <section className="container service-split-section">
          <div>
            <div className="mini-heading">{labels.problem}</div>
            <h2>{service.problemTitle}</h2>
          </div>
          <div className="service-line-list">
            {service.problems.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>

        <section className="container service-split-section">
          <div>
            <div className="mini-heading">{labels.solution}</div>
            <h2>{service.solutionTitle}</h2>
          </div>
          <div className="service-line-list strong">
            {service.solutions.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>

        <section className="container service-detail-section">
          <div className="service-section-heading">
            <div className="mini-heading">{labels.deliverables}</div>
            <h2>{service.deliverablesTitle}</h2>
          </div>
          <div className="card-grid four-service-grid">
            {service.deliverables.map((item) => (
              <article className="card service-mini-card" key={item}>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container service-detail-section">
          <div className="service-section-heading">
            <div className="mini-heading">{labels.outcomes}</div>
            <h2>{service.outcomesTitle}</h2>
          </div>
          <div className="service-outcome-grid">
            {service.outcomes.map((item, index) => (
              <div className="service-outcome-row" key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container service-detail-section">
          <div className="service-section-heading">
            <div className="mini-heading">{labels.references}</div>
            <h2>{service.referencesTitle}</h2>
          </div>
          <div className="card-grid three-up">
            {references.map((item) => (
              <a
                className="card service-reference-card"
                href={item.href}
                key={item.slug}
                rel="noreferrer"
                target="_blank"
              >
                <div className="mini-heading">{item.eyebrow}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className="pill-row">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span className="pill" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
          <div className="service-text-link">
            <Link className="feat-link" to={workHref}>
              {language === 'fr' ? 'Voir tous les projets ->' : 'View all work ->'}
            </Link>
          </div>
        </section>

        <section className="container service-detail-section">
          <div className="service-section-heading">
            <div className="mini-heading">{labels.process}</div>
            <h2>{service.processTitle}</h2>
          </div>
          <div className="cols three-up med-gap">
            {service.process.map((step, index) => (
              <article className="card process-card" key={step.title}>
                <div className="mini-heading">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="h4">{step.title}</h3>
                <p className="light">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container service-detail-section">
          <div className="service-section-heading">
            <div className="mini-heading">{labels.faq}</div>
            <h2>{labels.faq}</h2>
          </div>
          <div className="service-faq-list">
            {service.faq.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="container service-detail-section">
          <div className="service-related-head">
            <div>
              <div className="mini-heading">{labels.related}</div>
              <h2>{labels.related}</h2>
            </div>
            <div className="btn-grp">
              <Link className="btn big" to={contactHref}>
                {service.ctaPrimary}
              </Link>
            </div>
          </div>
          <div className="service-related-list">
            {relatedServices.map((item) => (
              <Link
                className="service-related-link"
                key={item.slug}
                to={getLocalizedHref(`/services/${item.slug}`, language)}
              >
                <span>{item.navLabel}</span>
                <strong>{item.title}</strong>
              </Link>
            ))}
          </div>
        </section>

        <CtaSection />
        <MerchantWinsTicker />
        <div className="gap-xxl" />
      </article>
    </>
  );
}
