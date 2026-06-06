import type {Route} from './+types/[llms.txt]';
import {
  getBankPackages,
  getFaqs,
  getPublicConfig,
  getRetainerPackages,
  getServices,
  siteConfig,
} from '~/lib/pasquin';

export function loader({context}: Route.LoaderArgs) {
  const publicConfig = getPublicConfig(context.env);
  const englishServices = getServices('en');
  const frenchServices = getServices('fr');
  const englishBankPackages = getBankPackages('en');
  const frenchBankPackages = getBankPackages('fr');
  const englishRetainers = getRetainerPackages('en');
  const frenchRetainers = getRetainerPackages('fr');
  const englishFaqs = getFaqs('en');
  const frenchFaqs = getFaqs('fr');
  const lines = [
    '# Philippe Pasquin',
    '',
    '> Montreal-based Shopify developer for merchants that need storefront improvements, theme cleanup, app integrations, automation, performance work, and ongoing technical support.',
    '',
    '## Business',
    `- Name: ${siteConfig.name}`,
    `- Brand mark: ${siteConfig.logo}`,
    `- Location: ${siteConfig.location.city}, ${siteConfig.location.region}, ${siteConfig.location.country}`,
    `- Email: ${publicConfig.contactEmail}`,
    '- Primary category: Shopify developer',
    '- Service area: Montreal, Canada, and remote Shopify merchants',
    '- Site style: light, lean, multi-page personal service site inspired by the previous Never Before Seen layout system',
    '- Primary pages: What We Do, Work, Pricing, About, Testimonials, Contact',
    '- French pages: /fr, /fr/work, /fr/pricing, /fr/about, /fr/testimonials, /fr/contact',
    '',
    '## Services (English)',
    ...englishServices.map((service) => `- ${service.title}: ${service.text}`),
    '',
    '## Services (French)',
    ...frenchServices.map((service) => `- ${service.title}: ${service.text}`),
    '',
    '## Bank of hours',
    ...englishBankPackages.map(
      (item) =>
        `- ${item.name}: ${item.hours}, ${item.price}, ${item.detail}. Best for ${item.bestFor}.`,
    ),
    '',
    "## Banques d'heures",
    ...frenchBankPackages.map(
      (item) =>
        `- ${item.name}: ${item.hours}, ${item.price}, ${item.detail}. Ideal pour ${item.bestFor}.`,
    ),
    '',
    '## Monthly retainers',
    ...englishRetainers.map(
      (item) =>
        `- ${item.name}: ${item.hours}, ${item.price}, ${item.detail}. ${item.rollover}.`,
    ),
    '',
    '## Retainers mensuels',
    ...frenchRetainers.map(
      (item) =>
        `- ${item.name}: ${item.hours}, ${item.price}, ${item.detail}. ${item.rollover}.`,
    ),
    '',
    '## FAQ (English)',
    ...englishFaqs.flatMap((faq) => [`- Q: ${faq.question}`, `  A: ${faq.answer}`]),
    '',
    '## FAQ (French)',
    ...frenchFaqs.flatMap((faq) => [`- Q: ${faq.question}`, `  A: ${faq.answer}`]),
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
