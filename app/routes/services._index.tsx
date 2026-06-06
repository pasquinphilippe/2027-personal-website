import {Link, useLoaderData} from 'react-router';
import type {Route} from './+types/services._index';
import {FeedbackGrid, MerchantWinsTicker} from '~/components/LeanSections';
import {
  getLanguageFromPathSearch,
  getLanguageFromRequest,
  getLocalizedHref,
  getLocalizedUrl,
} from '~/lib/i18n';
import {
  getPartnerReviewSummary,
  getPublicConfig,
  siteConfig,
} from '~/lib/pasquin';
import {getServicePageSummaries} from '~/lib/servicePages';

export const meta: Route.MetaFunction = ({data, location}) => {
  const language =
    data?.language ??
    getLanguageFromPathSearch(location.pathname, location.search);
  const siteUrl = data?.publicConfig.siteUrl || siteConfig.defaultSiteUrl;
  const canonical = getLocalizedUrl(siteUrl, '/services', language);
  const title =
    language === 'fr'
      ? 'Services de developpement Shopify | Philippe Pasquin'
      : 'Shopify Development Services | Philippe Pasquin';
  const description =
    language === 'fr'
      ? 'Services Shopify a Montreal pour storefronts, themes, pages produits, collections, panier, integrations, performance, automatisation et support en banque d heures.'
      : 'Montreal Shopify development services for storefront systems, themes, product pages, collections, carts, integrations, performance, automation, and bank-of-hours support.';

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
  const reviewSummary = getPartnerReviewSummary();
  const baseUrl = publicConfig.siteUrl.replace(/\/$/, '');
  const faq =
    language === 'fr'
      ? [
          {
            question: 'Quel service Shopify choisir en premier?',
            answer:
              'Si le probleme touche plusieurs pages ou flux, commencez par les systemes storefront. Si chaque modification est lente ou risquee, commencez par le nettoyage de theme. Si les apps, automatisations ou donnees bloquent les operations, commencez par app stack et operations.',
          },
          {
            question:
              'Est-ce que le travail peut commencer avec une petite banque?',
            answer:
              'Oui. Une banque de 5 heures permet de diagnostiquer, corriger les frictions urgentes ou cadrer un sprint plus large avant d investir davantage.',
          },
          {
            question: 'Est-ce adapte aux boutiques Shopify existantes?',
            answer:
              'Oui. Le travail est concu pour les boutiques deja en marche qui ont besoin d execution propre, de priorites claires et de meilleures fondations techniques.',
          },
        ]
      : [
          {
            question: 'Which Shopify service should I choose first?',
            answer:
              'If the problem spans several pages or buying flows, start with storefront systems. If every change feels slow or risky, start with theme cleanup. If apps, automations, or data are blocking operations, start with app stack and operations.',
          },
          {
            question: 'Can the work start with a small bank of hours?',
            answer:
              'Yes. A 5-hour bank is enough to diagnose, fix urgent friction, or scope a larger sprint before committing more budget.',
          },
          {
            question: 'Is this for existing Shopify stores?',
            answer:
              'Yes. The service model is built for stores already operating on Shopify that need cleaner execution, clearer priorities, and stronger technical foundations.',
          },
        ];

  return {
    language,
    publicConfig,
    primaryServices,
    shopifyWork,
    reviewSummary,
    faq,
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${baseUrl}${language === 'fr' ? '/fr' : ''}/services#collection`,
        name:
          language === 'fr'
            ? 'Services Shopify Philippe Pasquin'
            : 'Philippe Pasquin Shopify services',
        url: `${baseUrl}${language === 'fr' ? '/fr' : ''}/services`,
        description:
          language === 'fr'
            ? 'Services de developpement Shopify pour marchands etablis.'
            : 'Shopify development services for established merchants.',
        hasPart: [...primaryServices, ...shopifyWork].map((service) => ({
          '@type': 'Service',
          name: service.title,
          url: `${baseUrl}${language === 'fr' ? '/fr' : ''}${service.href}`,
          description: service.summary,
          areaServed: ['Canada', 'United States', 'Quebec', 'Montreal'],
          provider: {
            '@type': 'Person',
            name: 'Philippe Pasquin',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Montreal',
              addressRegion: 'Quebec',
              addressCountry: 'CA',
            },
          },
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export default function ServicesOverviewPage() {
  const {
    language,
    primaryServices,
    shopifyWork,
    structuredData,
    reviewSummary,
    faq,
  } = useLoaderData<typeof loader>();
  const labels =
    language === 'fr'
      ? {
          eyebrow: 'Services',
          title: 'Developpement Shopify pour garder la boutique en mouvement.',
          intro:
            'Choisissez le bon point de depart: systeme storefront, theme, apps, panier, performance ou automatisation. Chaque service est concu pour corriger les frictions qui coutent du temps, de la clarte et des ventes.',
          primary: 'Services principaux',
          deeper: 'Travail Shopify specialise',
          explore: 'Voir le service',
          proof: [
            'Montreal, Quebec',
            `${reviewSummary.rating} / 5 sur ${reviewSummary.reviewCount} avis Shopify`,
            `Partenaire depuis ${reviewSummary.partnerSince}`,
            'Banques de 5 a 40 heures',
          ],
          diagnostic: 'Point de depart',
          diagnosticTitle: 'Pas un menu technique. Un chemin de decision.',
          diagnosticText:
            'Le but est de trouver le blocage commercial, puis de choisir la plus petite intervention Shopify qui peut le debloquer proprement.',
          diagnosticItems: [
            ['01', 'Acheter', 'PDP, collections, panier, checkout readiness'],
            ['02', 'Operer', 'Apps, automatisations, donnees, QA'],
            ['03', 'Maintenir', 'Theme, sections, performance, documentation'],
          ],
          serviceCta: 'Explorer',
          secondaryCta: 'Comparer les prix',
          primaryCta: 'Reserver un appel',
          processEyebrow: 'Methode',
          processTitle: 'Le travail reste simple a suivre.',
          process: [
            [
              'Diagnostiquer',
              'Identifier le flux, le template ou l operation Shopify qui ralentit le plus la boutique.',
            ],
            [
              'Prioriser',
              'Transformer le probleme en backlog clair avec heures, risque et impact commercial.',
            ],
            [
              'Executer',
              'Livrer les changements, tester les parcours critiques et documenter les nouvelles regles.',
            ],
          ],
          faqEyebrow: 'FAQ',
          finalTitle: 'Vous ne savez pas quel service choisir?',
          finalText:
            'Commencez par un appel court. Le bon engagement peut etre une banque de 5 heures, un sprint de 40 heures ou un retainer mensuel.',
        }
      : {
          eyebrow: 'Services',
          title: 'Shopify development for stores that need momentum.',
          intro:
            'Pick the right starting point: storefront systems, theme cleanup, apps, cart readiness, performance, or automation. Each service is designed around the operational friction that costs time, clarity, and revenue.',
          primary: 'Primary services',
          deeper: 'Specialized Shopify work',
          explore: 'View service',
          proof: [
            'Montreal, Quebec',
            `${reviewSummary.rating} / 5 from ${reviewSummary.reviewCount} Shopify reviews`,
            `Partner since ${reviewSummary.partnerSince}`,
            '5 to 40 hour banks',
          ],
          diagnostic: 'Starting point',
          diagnosticTitle: 'Not a technical menu. A decision path.',
          diagnosticText:
            'The goal is to find the commercial blocker, then choose the smallest Shopify intervention that can unlock it cleanly.',
          diagnosticItems: [
            ['01', 'Buy', 'PDPs, collections, cart, checkout readiness'],
            ['02', 'Operate', 'Apps, automations, data, QA'],
            ['03', 'Maintain', 'Theme, sections, performance, documentation'],
          ],
          serviceCta: 'Explore',
          secondaryCta: 'Compare pricing',
          primaryCta: 'Book a call',
          processEyebrow: 'Method',
          processTitle: 'The work stays easy to follow.',
          process: [
            [
              'Diagnose',
              'Identify the Shopify flow, template, or operation slowing the store down most.',
            ],
            [
              'Prioritize',
              'Turn the problem into a clear backlog with hours, risk, and commercial impact.',
            ],
            [
              'Execute',
              'Ship the changes, test critical paths, and document the new operating rules.',
            ],
          ],
          faqEyebrow: 'FAQ',
          finalTitle: 'Not sure which service fits?',
          finalText:
            'Start with a short call. The right engagement might be a 5-hour bank, a 40-hour sprint, or monthly support.',
        };

  return (
    <>
      {structuredData.map((schema) => (
        <script
          key={schema['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
        />
      ))}

      <section className="container services-overview-hero">
        <div className="services-overview-copy">
          <div className="hero-proof-callout">{labels.eyebrow}</div>
          <h1>{labels.title}</h1>
          <p className="subtitle light">{labels.intro}</p>
          <div className="services-proof-row">
            {labels.proof.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="btn-grp">
            <Link
              className="btn big"
              to={getLocalizedHref('/contact', language)}
            >
              {labels.primaryCta}
            </Link>
            <Link
              className="btn big secondary"
              to={getLocalizedHref('/pricing', language)}
            >
              {labels.secondaryCta}
            </Link>
          </div>
        </div>
        <div
          className="services-diagnostic-panel"
          aria-label={labels.diagnostic}
        >
          <span>{labels.diagnostic}</span>
          <h2>{labels.diagnosticTitle}</h2>
          <p>{labels.diagnosticText}</p>
          <div className="services-diagnostic-list">
            {labels.diagnosticItems.map(([number, title, text]) => (
              <div key={title}>
                <small>{number}</small>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              <strong>
                {labels.serviceCta}
                <i aria-hidden="true">-&gt;</i>
              </strong>
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
              <em>{labels.explore}</em>
            </Link>
          ))}
        </div>
      </section>

      <div className="gap-xxl" />
      <section className="container services-process">
        <div className="service-section-heading">
          <div className="mini-heading">{labels.processEyebrow}</div>
          <h2>{labels.processTitle}</h2>
        </div>
        <div className="services-process-grid">
          {labels.process.map(([title, text], index) => (
            <div key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="gap-xl" />
      <FeedbackGrid />

      <div className="gap-xl" />
      <section className="container services-faq-cta">
        <div className="services-faq-panel">
          <div className="mini-heading">{labels.faqEyebrow}</div>
          {faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
        <div className="services-final-cta">
          <h2>{labels.finalTitle}</h2>
          <p>{labels.finalText}</p>
          <Link className="btn big" to={getLocalizedHref('/contact', language)}>
            {labels.primaryCta}
          </Link>
        </div>
      </section>

      <MerchantWinsTicker />
      <div className="gap-xxl" />
    </>
  );
}
