import type {Route} from './+types/[llms.txt]';
import {
  getFaqs,
  getPartnerReviewSummary,
  getPublicConfig,
  getServices,
  siteConfig,
} from '~/lib/pasquin';
import {getPricingProductSummaries} from '~/lib/pricingProducts';
import {getServicePageSummaries} from '~/lib/servicePages';

export function loader({context}: Route.LoaderArgs) {
  const publicConfig = getPublicConfig(context.env);
  const englishServices = getServices('en');
  const frenchServices = getServices('fr');
  const englishPricingProducts = getPricingProductSummaries('en');
  const frenchPricingProducts = getPricingProductSummaries('fr');
  const englishFaqs = getFaqs('en');
  const frenchFaqs = getFaqs('fr');
  const partnerSummary = getPartnerReviewSummary();
  const baseUrl = publicConfig.siteUrl.replace(/\/$/, '');
  const englishServicePages = getServicePageSummaries('en');
  const frenchServicePages = getServicePageSummaries('fr');
  const lines = [
    '# Philippe Pasquin',
    '',
    '> Montreal-based Shopify developer for merchants that need storefront improvements, theme cleanup, app integrations, automation, performance work, and ongoing technical support.',
    '',
    '## Business',
    `- Name: ${siteConfig.name}`,
    `- Brand mark: ${siteConfig.logo}`,
    `- Location: ${siteConfig.location.city}, ${siteConfig.location.region}, ${siteConfig.location.country}`,
    `- Contact email: ${publicConfig.contactEmail}`,
    `- Support email: ${publicConfig.supportEmail}`,
    '- Primary category: Shopify developer',
    '- Service area: Montreal, Canada, and remote Shopify merchants',
    '- Site style: light, lean, multi-page personal service site inspired by the previous Never Before Seen layout system',
    `- Shopify Partner Directory: ${partnerSummary.rating}/5.0 rating from ${partnerSummary.reviewCount} public reviews, partner since ${partnerSummary.partnerSince}`,
    '- Primary pages: Services, Work, Pricing, About, Testimonials, Contact',
    '- French pages: /fr, /fr/services, /fr/work, /fr/pricing, /fr/about, /fr/testimonials, /fr/contact',
    '- Feeds: /sitemap.xml, /services-sitemap.xml, /feed.xml, /llms.txt',
    ...(siteConfig.socialProfiles.length
      ? ['- Profiles:', ...siteConfig.socialProfiles.map((url) => `  - ${url}`)]
      : []),
    '',
    '## Services (English)',
    ...englishServices.map((service) => `- ${service.title}: ${service.text}`),
    '',
    '## Service pages (English)',
    ...englishServicePages.map(
      (service) =>
        `- ${service.navLabel}: ${baseUrl}${service.href} - ${service.summary}`,
    ),
    '',
    '## Services (French)',
    ...frenchServices.map((service) => `- ${service.title}: ${service.text}`),
    '',
    '## Pages de services (French)',
    ...frenchServicePages.map(
      (service) =>
        `- ${service.navLabel}: ${baseUrl}/fr${service.href} - ${service.summary}`,
    ),
    '',
    '## Shopify pricing products (English)',
    '- Public pricing supports CAD, USD, EUR, and GBP using Shopify service product handles and Shopify Markets when available.',
    ...englishPricingProducts.map(
      (item) =>
        `- ${item.name} (${item.handle}): ${item.price} ${item.cadence}, ${item.mode}, ${item.hours ? `${item.hours} hour allocation` : 'priced by scope'}. Best for ${item.bestFor}.`,
    ),
    '',
    '## Produits tarifaires Shopify (French)',
    '- Les tarifs publics supportent CAD, USD, EUR et GBP avec les handles de produits de service Shopify et Shopify Markets quand disponible.',
    ...frenchPricingProducts.map(
      (item) =>
        `- ${item.name} (${item.handle}): ${item.price} ${item.cadence}, ${item.mode}, ${item.hours ? `${item.hours} h allouees` : 'tarif selon portee'}. Ideal pour ${item.bestFor}.`,
    ),
    '',
    '## FAQ (English)',
    ...englishFaqs.flatMap((faq) => [
      `- Q: ${faq.question}`,
      `  A: ${faq.answer}`,
    ]),
    '',
    '## FAQ (French)',
    ...frenchFaqs.flatMap((faq) => [
      `- Q: ${faq.question}`,
      `  A: ${faq.answer}`,
    ]),
    '',
    '## Booking',
    'Use the booking section on the website to choose a bank of hours, retainer, or diagnostic call before scheduling.',
    'Utilisez la section rendez-vous du site francais pour choisir une banque d’heures, un retainer ou un appel diagnostic avant de planifier.',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': `max-age=${60 * 60 * 24}`,
    },
  });
}
